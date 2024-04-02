import * as dartProgram from './gsoc.mjs'

const imports = {};
const module = await dartProgram.instantiate(WebAssembly.compileStreaming(fetch('gsoc.wasm')), imports);
dartProgram.invoke(module);
