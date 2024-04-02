import * as dartProgram from './sample.mjs'

Module.onRuntimeInitialized = async () => {
  const imports = {
    add: Module.cwrap("add", "number", ["number", "number"]),
  };
  
  const module = await dartProgram.instantiate(WebAssembly.compileStreaming(fetch('sample.wasm')), imports);
  dartProgram.invoke(module);

  // console.log(api.add(1, 2));
}