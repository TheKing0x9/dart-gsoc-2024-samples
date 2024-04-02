#!/bin/bash

includePaths="native/"
cflags="-O3"
lflags="-s WASM=1 -s EXPORTED_RUNTIME_METHODS=[\"cwrap\"] -s ALLOW_MEMORY_GROWTH=1"

platform="unix"
compiler="emcc"
outfile="web/native.js"
lflags="$lflags -o $outfile"

echo "compiling ($platform)..."
for f in `find native -name "*.c"`; do
    $compiler -c $f -o "${f//\//_}.o" $cflags 
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

echo "compiling dart..."
dart compile wasm bin/sample.dart -o web/sample.wasm -v

echo "done"