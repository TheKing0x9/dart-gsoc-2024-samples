# dart-gsoc-2024-samples

Sample projects for Dart 2024 FFIGenPad Idea

## Project List

### Compiling C to WASM using Emscripten

Wrote a wrapper around libwepb and compiled it to WASM using Emscripten. The module was
then interfaced via JavaScript to convert a png image to webp.

### Compiling C to WASM using WASI

Compiled a project that used file operations to WASM using WASI SDK and ran the project in a
sandboxed environment using wasmtime runtime.

### Compiling Dart to WASMGC

Wrote a very simple Dart project and compiled it to WebAssembly using the inbuilt WASM target.
Compiling a C Library to WASM and interact with it from Dart

### A combination of the previous projects, wrote a simple function in C and tried to call it from Dart.

The C library was compiled using Emscripten and then passed in as an import to the Dart
module. This sample project however did not work successfully and failed with the following
error. I am currently exploring why this is happening and how I should fix it.

## Build Instructions

### Dependencies

To build the projects, the following dependencies are required

* Emscripten : To build `c-emcc` and `final-project` samples
* WASI : To build `c-wasi` sample. Update the relevant paths in `build.sh` file of `c-wasi` sample too.
* Dart SDK : To build `dart-wasmgc` and `final-project` samples
* wasmtime: To run the `c-wasi` sample.

### Compiling

To compile any of the samples, change directory into the sample and run the `build.sh` file.

### Running

To run any example other than `c-wasi`, change directory into the `web` folder of the relevant sample and start a web server.

To run the `c-wasi` sample, change directory into the sample folder and run the `wasmtime gsoc.wasm` command there.

To provide out of the box support for checking out the samples, the precompiled wasm files been provided in each sample.