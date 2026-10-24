"""Subset the three OFL fonts to Latin (DE/EN/IT) and write WOFF2 into public/assets/fonts."""
import os, sys, glob
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pyshim'))  # brotli stand-in
from fontTools import subset
from fontTools.ttLib import TTFont

SRC = {
    'league-gothic-semicondensed': glob.glob('/mnt/user-data/attachments/*/*LeagueGothic_SemiCondensed-Regular.ttf')[0],
    'roboto-regular': glob.glob('/mnt/user-data/attachments/*/*Roboto-Regular.ttf')[0],
    'playwrite-it-trad-light': glob.glob('/mnt/user-data/attachments/*/*PlaywriteITTrad-Light.ttf')[0],
}
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'assets', 'fonts')
os.makedirs(OUT, exist_ok=True)
UNICODES = ('U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2009,U+200A,U+2013-2014,'
            'U+2018-201A,U+201C-201E,U+2022,U+2026,U+2030,U+2039-203A,U+20AC,U+2122,U+2190-2193,U+2212,U+2215')
for name, src in SRC.items():
    for flavor in ('woff2',):
        out = os.path.join(OUT, f'{name}.{flavor}')
        args = [src, f'--unicodes={UNICODES}', '--layout-features=*', f'--flavor={flavor}',
                '--no-hinting', '--desubroutinize', f'--output-file={out}']
        subset.main(args)
        t = TTFont(out)
        print(f'{name:32s} {flavor}: {os.path.getsize(out)/1024:6.1f} KB, {len(t.getGlyphOrder())} glyphs (src {os.path.getsize(src)/1024:.0f} KB)')
