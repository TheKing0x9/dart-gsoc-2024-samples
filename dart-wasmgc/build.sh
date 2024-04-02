#!/bin/bash

compiler=dart
entry=bin/gsoc_dart.dart
outdir=web
target=wasm
outfile=gsoc.wasm

$compiler compile $target $entry -o $outdir/$outfile