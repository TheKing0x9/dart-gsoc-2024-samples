  let buildArgsList;

// `modulePromise` is a promise to the `WebAssembly.module` object to be
//   instantiated.
// `importObjectPromise` is a promise to an object that contains any additional
//   imports needed by the module that aren't provided by the standard runtime.
//   The fields on this object will be merged into the importObject with which
//   the module will be instantiated.
// This function returns a promise to the instantiated module.
export const instantiate = async (modulePromise, importObjectPromise) => {
    let dartInstance;

      function stringFromDartString(string) {
        const totalLength = dartInstance.exports.$stringLength(string);
        let result = '';
        let index = 0;
        while (index < totalLength) {
          let chunkLength = Math.min(totalLength - index, 0xFFFF);
          const array = new Array(chunkLength);
          for (let i = 0; i < chunkLength; i++) {
              array[i] = dartInstance.exports.$stringRead(string, index++);
          }
          result += String.fromCharCode(...array);
        }
        return result;
    }

    function stringToDartString(string) {
        const length = string.length;
        let range = 0;
        for (let i = 0; i < length; i++) {
            range |= string.codePointAt(i);
        }
        if (range < 256) {
            const dartString = dartInstance.exports.$stringAllocate1(length);
            for (let i = 0; i < length; i++) {
                dartInstance.exports.$stringWrite1(dartString, i, string.codePointAt(i));
            }
            return dartString;
        } else {
            const dartString = dartInstance.exports.$stringAllocate2(length);
            for (let i = 0; i < length; i++) {
                dartInstance.exports.$stringWrite2(dartString, i, string.charCodeAt(i));
            }
            return dartString;
        }
    }

      // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
        const length = dartInstance.exports.$listLength(list);
        const array = new constructor(length);
        for (let i = 0; i < length; i++) {
            array[i] = dartInstance.exports.$listRead(list, i);
        }
        return array;
    }

    buildArgsList = function(list) {
        const dartList = dartInstance.exports.$makeStringList();
        for (let i = 0; i < list.length; i++) {
            dartInstance.exports.$listAdd(dartList, stringToDartString(list[i]));
        }
        return dartList;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
        wrapped.dartFunction = dartFunction;
        wrapped[jsWrappedDartFunctionSymbol] = true;
        return wrapped;
    }

    if (WebAssembly.String === undefined) {
        console.log("WebAssembly.String is undefined, adding polyfill");
        WebAssembly.String = {
            "charCodeAt": (s, i) => s.charCodeAt(i),
            "compare": (s1, s2) => {
                if (s1 < s2) return -1;
                if (s1 > s2) return 1;
                return 0;
            },
            "concat": (s1, s2) => s1 + s2,
            "equals": (s1, s2) => s1 === s2,
            "fromCharCode": (i) => String.fromCharCode(i),
            "length": (s) => s.length,
            "substring": (s, a, b) => s.substring(a, b),
        };
    }

    // Imports
    const dart2wasm = {

  _69: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_70: s => console.log(stringFromDartString(s)),
_173: o => o === undefined,
_174: o => typeof o === 'boolean',
_175: o => typeof o === 'number',
_177: o => typeof o === 'string',
_180: o => o instanceof Int8Array,
_181: o => o instanceof Uint8Array,
_182: o => o instanceof Uint8ClampedArray,
_183: o => o instanceof Int16Array,
_184: o => o instanceof Uint16Array,
_185: o => o instanceof Int32Array,
_186: o => o instanceof Uint32Array,
_187: o => o instanceof Float32Array,
_188: o => o instanceof Float64Array,
_189: o => o instanceof ArrayBuffer,
_190: o => o instanceof DataView,
_191: o => o instanceof Array,
_192: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_196: (l, r) => l === r,
_197: o => o,
_198: o => o,
_199: o => o,
_200: b => !!b,
_201: o => o.length,
_204: (o, i) => o[i],
_205: f => f.dartFunction,
_206: l => arrayFromDartList(Int8Array, l),
_207: l => arrayFromDartList(Uint8Array, l),
_208: l => arrayFromDartList(Uint8ClampedArray, l),
_209: l => arrayFromDartList(Int16Array, l),
_210: l => arrayFromDartList(Uint16Array, l),
_211: l => arrayFromDartList(Int32Array, l),
_212: l => arrayFromDartList(Uint32Array, l),
_213: l => arrayFromDartList(Float32Array, l),
_214: l => arrayFromDartList(Float64Array, l),
_215: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_216: l => arrayFromDartList(Array, l),
_217: stringFromDartString,
_225: (o, p) => o[p],
_221: l => new Array(l),
_229: o => String(o),
_132: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_82: (a, i) => a.push(i),
_93: a => a.length,
_95: (a, i) => a[i],
_96: (a, i, v) => a[i] = v,
_98: a => a.join(''),
_108: (s, p, i) => s.indexOf(p, i),
_111: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_112: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_113: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_114: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_115: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_116: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_117: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_120: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_121: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_123: WebAssembly.String.charCodeAt,
_126: WebAssembly.String.length,
_127: WebAssembly.String.equals,
_128: WebAssembly.String.compare,
_129: WebAssembly.String.fromCharCode,
_136: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_137: (b, o) => new DataView(b, o),
_139: Function.prototype.call.bind(DataView.prototype.getUint8),
_141: Function.prototype.call.bind(DataView.prototype.getInt8),
_143: Function.prototype.call.bind(DataView.prototype.getUint16),
_145: Function.prototype.call.bind(DataView.prototype.getInt16),
_147: Function.prototype.call.bind(DataView.prototype.getUint32),
_149: Function.prototype.call.bind(DataView.prototype.getInt32),
_155: Function.prototype.call.bind(DataView.prototype.getFloat32),
_157: Function.prototype.call.bind(DataView.prototype.getFloat64),
_80: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_45: v => stringToDartString(v.toString()),
_60: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        }
      };

    const baseImports = {
        dart2wasm: dart2wasm,

  
          Math: Math,
        Date: Date,
        Object: Object,
        Array: Array,
        Reflect: Reflect,
    };
    dartInstance = await WebAssembly.instantiate(await modulePromise, {
        ...baseImports,
        ...(await importObjectPromise),
    });

    return dartInstance;
}

// Call the main function for the instantiated module
// `moduleInstance` is the instantiated dart2wasm module
// `args` are any arguments that should be passed into the main function.
export const invoke = (moduleInstance, ...args) => {
    const dartMain = moduleInstance.exports.$getMain();
    const dartArgs = buildArgsList(args);
    moduleInstance.exports.$invokeMain(dartMain, dartArgs);
}

