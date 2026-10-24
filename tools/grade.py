"""Selective colour grade: rotate the red family of each photo onto the brand red #DB042C.

Works in OKLab/OKLCh so lightness (L) is untouched -> image content/structure stays identical.
Only hue (and a gentle chroma lift) of red-ish pixels changes, with a smooth falloff so
other hues (yellow lamps, blue screens, steel) are left alone.
"""
import sys, os, glob, json
import numpy as np
import io
from PIL import Image, ImageOps, ImageCms

SRGB = ImageCms.createProfile('sRGB')


def load_srgb(path):
    """Open, honour EXIF orientation and convert from the embedded ICC profile (e.g. Apple wide colour) to sRGB."""
    im = Image.open(path)
    icc = im.info.get('icc_profile')
    im = ImageOps.exif_transpose(im).convert('RGB')
    if icc:
        src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        im = ImageCms.profileToProfile(im, src, SRGB, renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC, outputMode='RGB')
    return im

TARGET = (0xDB, 0x04, 0x2C)


def srgb_to_linear(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def linear_to_srgb(c):
    c = np.clip(c, 0.0, 1.0)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * np.power(c, 1 / 2.4) - 0.055)


M1 = np.array([[0.4122214708, 0.5363325363, 0.0514459929],
               [0.2119034982, 0.6806995451, 0.1073969566],
               [0.0883024619, 0.2817188376, 0.6299787005]])
M2 = np.array([[0.2104542553, 0.7936177850, -0.0040720468],
               [1.9779984951, -2.4285922050, 0.4505937099],
               [0.0259040371, 0.7827717662, -0.8086757660]])
M1i = np.linalg.inv(M1)
M2i = np.linalg.inv(M2)


def rgb_to_oklab(rgb):  # rgb float 0..1 (..., 3)
    lin = srgb_to_linear(rgb)
    lms = lin @ M1.T
    lms_ = np.cbrt(lms)
    return lms_ @ M2.T


def oklab_to_rgb(lab):
    lms_ = lab @ M2i.T
    lms = lms_ ** 3
    lin = lms @ M1i.T
    return linear_to_srgb(lin), lin


def in_gamut(lin):
    return np.all((lin >= -1e-4) & (lin <= 1 + 1e-4), axis=-1)


def target_lch():
    t = np.array(TARGET, dtype=np.float64) / 255.0
    L, a, b = rgb_to_oklab(t[None, :])[0]
    return L, np.hypot(a, b), np.degrees(np.arctan2(b, a)) % 360


def ang_diff(a, b):
    return (a - b + 180.0) % 360.0 - 180.0


def grade(img, hue_compress=0.6, max_gain=1.35):
    rgb = np.asarray(img).astype(np.float64) / 255.0
    lab = rgb_to_oklab(rgb)
    L, a, b = lab[..., 0], lab[..., 1], lab[..., 2]
    C = np.hypot(a, b)
    H = np.degrees(np.arctan2(b, a)) % 360

    tL, tC, tH = target_lch()
    # red family of this photo
    fam = (np.abs(ang_diff(H, tH)) < 45) & (C > 0.06)
    hh = np.radians(H[fam]); w0 = C[fam]
    h0 = np.degrees(np.arctan2((np.sin(hh) * w0).sum(), (np.cos(hh) * w0).sum())) % 360
    p90 = np.percentile(C[fam], 90)
    gain = float(np.clip(tC / p90, 1.0, max_gain))

    # weight: full inside +-40deg of brand hue, smooth fade to 0 at +-75deg; ramp in with chroma
    d = np.abs(ang_diff(H, tH))
    t = np.clip((d - 40.0) / 35.0, 0, 1)
    w = (1 - (t * t * (3 - 2 * t))) * np.clip(C / 0.04, 0, 1)

    # hue: pull the whole red family onto the brand hue and tighten its spread
    off = ang_diff(H, tH)
    H2 = tH + off * (1 - hue_compress * w)
    H2 = np.where(w > 0, H2, H)
    # chroma: lift so the photo's strongest reds reach brand chroma (gamut permitting)
    C2 = C * (1 + (gain - 1) * w)

    a2 = C2 * np.cos(np.radians(H2))
    b2 = C2 * np.sin(np.radians(H2))
    out, lin = oklab_to_rgb(np.stack([L, a2, b2], -1))

    bad = ~in_gamut(lin)
    if bad.any():
        lo = np.zeros(bad.sum()); hi = np.ones(bad.sum())
        Lb, Cb, Hb = L[bad], C2[bad], H2[bad]
        for _ in range(14):
            mid = (lo + hi) / 2
            ab = np.stack([Lb, Cb * mid * np.cos(np.radians(Hb)), Cb * mid * np.sin(np.radians(Hb))], -1)
            _, linb = oklab_to_rgb(ab)
            ok = in_gamut(linb)
            lo = np.where(ok, mid, lo); hi = np.where(ok, hi, mid)
        ab = np.stack([Lb, Cb * lo * np.cos(np.radians(Hb)), Cb * lo * np.sin(np.radians(Hb))], -1)
        outb, _ = oklab_to_rgb(ab)
        out[bad] = outb
    out8 = np.clip(np.round(out * 255), 0, 255).astype(np.uint8)
    return Image.fromarray(out8), dict(h0=float(h0), target=float(tH), delta=float(ang_diff(tH, h0)), gain=gain, oog=float(bad.mean()))


def luma(img):
    a = np.asarray(img.convert('L')).astype(np.float64)
    return a


def ssim_like(a, b):
    # global SSIM on luminance (structure check); 1.0 = identical structure
    mu_a, mu_b = a.mean(), b.mean()
    va, vb = a.var(), b.var()
    cov = ((a - mu_a) * (b - mu_b)).mean()
    c1, c2 = (0.01 * 255) ** 2, (0.03 * 255) ** 2
    return ((2 * mu_a * mu_b + c1) * (2 * cov + c2)) / ((mu_a ** 2 + mu_b ** 2 + c1) * (va + vb + c2))


if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]
    os.makedirs(dst, exist_ok=True)
    report = {}
    for f in sorted(glob.glob(os.path.join(src, '*'))):
        if not f.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue
        im = load_srgb(f)
        out, info = grade(im)
        name = os.path.splitext(os.path.basename(f))[0] + '.jpg'
        out.save(os.path.join(dst, name), quality=95, subsampling=0, optimize=True)  # untagged = sRGB, no EXIF/GPS
        im.save(os.path.join(dst, '_srgb_' + name), quality=95, subsampling=0)  # colour-managed original for comparison
        # OKLab-L is preserved exactly; report Rec.601 luma structure similarity as a sanity check
        info['ssim_luma'] = float(ssim_like(luma(im), luma(out)))
        report[name] = info
        print(f"{name:16s} red hue {info['h0']:6.1f} -> {info['target']:6.1f}  chroma x{info['gain']:.2f}  gamut-mapped {info['oog']*100:4.1f}%  luma-SSIM {info['ssim_luma']:.4f}")
    with open(os.path.join(dst, '_grade_report.json'), 'w') as fh:
        json.dump(report, fh, indent=1)
