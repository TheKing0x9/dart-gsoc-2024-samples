#!/bin/bash

includePaths="include/libwebp/"
cflags="-O3"
lflags="-s WASM=1 -s EXPORTED_RUNTIME_METHODS=[\"cwrap\"] -s ALLOW_MEMORY_GROWTH=1"

platform="unix"
compiler="emcc"
outfile="web/webp.js"
lflags="$lflags -o $outfile"

echo "compiling ($platform)..."
for f in `find src -name "*.c"`; do
    $compiler -c $cflags -I$includePaths $f -o "${f//\//_}.o"
    if [[ $? -ne 0 ]]; then
        got_error=true
    fi
done

for f in `find include/libwebp/src/{dec,dsp,demux,enc,mux,utils} -name "*.c"`; do
    $compiler -c $cflags -I$includePaths $f -o "${f//\//_}.o"
    if [[ $? -ne 0 ]]; then
        got_error=true
    fi
done

for f in `find include/libwebp/sharpyuv/ -name "*.c"`; do
    $compiler -c $cflags -I$includePaths $f -o "${f//\//_}.o"
    if [[ $? -ne 0 ]]; then
        got_error=true
    fi
done

if [[ ! $got_error ]]; then
  echo "linking..."
  $compiler *.o $lflags
fi

echo "cleaning up..."
rm *.o
echo "done"