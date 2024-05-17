"use strict";

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

  console.log(Object.getOwnPropertyNames(instance.exports));
  wasi.initialize(instance);
  // wasi.start(instance);

  instance.exports.hello();
  console.log(instance.exports.add(1, 2));
  console.log("Returning a string");
  console.log(instance.exports.return_string());
  console.log("Inputting a string");
  instance.exports.input_string("hello");
  // instance.exports.read_file();

})();
