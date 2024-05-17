let imports = {};
let wasm;
const { TextDecoder, TextEncoder } = require(`util`);

/**
* @param {number} left
* @param {number} right
* @returns {number}
*/
module.exports.add = function(left, right) {
    const ret = wasm.add(left, right);
    return ret >>> 0;
};

/**
*/
module.exports.hello = function() {
    wasm.hello();
};

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
* @returns {string}
*/
module.exports.return_string = function() {
    let deferred1_0;
    let deferred1_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.return_string(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred1_0 = r0;
        deferred1_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
};

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
* @param {string} input
*/
module.exports.input_string = function(input) {
    const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.input_string(ptr0, len0);
};


// "use strict";

const fs = require("fs");
const { WASI } = require("wasi");
const path = require("path");
const util = require('util');

// const wasi = new WASI({
//   preopens: {
//     "/sandbox": process.cwd(),
//   },
// });

const wasi = new WASI({
  args: ["arg1", "arg2"],
  env: {
    abc: "def",
    foo: "bar",
  },
});

const importObject = { wasi_snapshot_preview1: wasi.wasiImport };
// const importObject = {};

(async () => {
  const wasm = await WebAssembly.compile(
    fs.readFileSync(
      "./examples/rust-wasi-helloworld-lib/target/wasm32-wasi/debug/rust_wasi_helloworld_lib.wasm",
      // "./examples/rust-wasi-helloworld/target/wasm32-wasi/debug/rust-wasi-helloworld.wasm"
      // "./examples/rust-wasi-readfile/target/wasm32-wasi/debug/rust_wasi_readfile.wasm"
      // "./examples/assemblyscript-wasi/build/as-wasi-example.wasm"
    )
  );
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.initialize(instance);
  module.exports.__wasm = instance.exports;
  // wasi.start(instance);

})();
wasm = module.exports.__wasm;




// const path = require('path').join(__dirname, 'rust_wasi_helloworld_lib_bg.wasm');
// const bytes = require('fs').readFileSync(path);
// 
// const wasmModule = new WebAssembly.Module(bytes);
// const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
// wasm = wasmInstance.exports;
// module.exports.__wasm = wasm;

