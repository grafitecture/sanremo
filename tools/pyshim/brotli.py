"""Minimal stand-in for the `brotli` module (used by fontTools for WOFF2), backed by Node's zlib."""
import subprocess
MODE_GENERIC, MODE_TEXT, MODE_FONT = 0, 1, 2
_JS = ("const z=require('zlib');const c=[];process.stdin.on('data',d=>c.push(d));"
       "process.stdin.on('end',()=>{const b=Buffer.concat(c);const o=%s;process.stdout.write(o);});")
def compress(data, mode=MODE_GENERIC, quality=11, lgwin=22, lgblock=0):
    expr = ("z.brotliCompressSync(b,{params:{[z.constants.BROTLI_PARAM_MODE]:%d,[z.constants.BROTLI_PARAM_QUALITY]:%d,"
            "[z.constants.BROTLI_PARAM_LGWIN]:%d,[z.constants.BROTLI_PARAM_SIZE_HINT]:b.length}})" % (mode, quality, lgwin))
    return subprocess.run(['node', '-e', _JS % expr], input=bytes(data), stdout=subprocess.PIPE, check=True).stdout
def decompress(data):
    return subprocess.run(['node', '-e', _JS % 'z.brotliDecompressSync(b)'], input=bytes(data), stdout=subprocess.PIPE, check=True).stdout
class error(Exception):
    pass
