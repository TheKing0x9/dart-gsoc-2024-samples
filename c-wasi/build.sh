#!/bin/bash

sysroot='/home/theking0x9/Applications/wasi/sysroot'
includePaths="include/"
cflags="--target=wasm32-wasi --sysroot $sysroot -Wall -Wunused-result -O3 -g"
lflags="-Wl, -v"

platform="unix"
outfile="gsoc.wasm"
compiler="/home/theking0x9/Applications/wasi/sdk/bin/clang"
lflags="$lflags -o $outfile"

echo "compiling ($platform)..."
for f in `find src -name "*.c"`; do
    $compiler -c $f -o "${f//\//_}.o" $cflags -I$includePaths
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