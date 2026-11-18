#!/usr/bin/env bash
# Rebuilds the woff2 files in this folder. Needs: python3 -m venv venv && ./venv/bin/pip install fonttools brotli
# Sources (OFL, see OFL-*.txt):
#   https://github.com/google/fonts/raw/main/ofl/archivo/Archivo%5Bwdth,wght%5D.ttf     -> src/archivo.ttf
#   https://github.com/google/fonts/raw/main/ofl/redhatmono/RedHatMono%5Bwght%5D.ttf     -> src/redhatmono.ttf
set -e
V=./venv/bin
# Latin, Latin-1, Latin Extended-A (Czech), general punctuation, euro, arrows, minus.
U="U+0020-007E,U+00A0-00FF,U+0100-017F,U+0131,U+0152-0153,U+02C6,U+02C7,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD"
mkdir -p tmp
inst() { # name src axis=value...
  n=$1; src=$2; shift 2
  $V/fonttools varLib.instancer -q "$src" "$@" -o tmp/$n.ttf
  $V/pyftsubset tmp/$n.ttf --unicodes="$U" --layout-features='kern,liga,calt,ccmp,locl,mark,mkmk,tnum,pnum,lnum,case,smcp,c2sc' \
    --flavor=woff2 --output-file=$n.woff2 --no-hinting --desubroutinize
}
inst archivo-400 src/archivo.ttf wght=400 wdth=100
inst archivo-600 src/archivo.ttf wght=600 wdth=100
inst archivo-600-125 src/archivo.ttf wght=600 wdth=125
inst archivo-600-112 src/archivo.ttf wght=600 wdth=112.5
inst redhatmono-400 src/redhatmono.ttf wght=400
