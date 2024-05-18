# WASI examples in NodeJS

# Rich's additions

The following is built into build commands in the package.json.

Build the component from Rust in examples/rust-wasi2:

https://component-model.bytecodealliance.org/language-support/rust.html

Run the component from Node in the root directory:

https://component-model.bytecodealliance.org/language-support/javascript.html
Run `node wasi2.js` or `npm start`

To add new functions you need to modify the wit file, here is a guide to syntax:

https://component-model.bytecodealliance.org/design/wit.html

If you need examples you can look at the wit tests for each feature:

https://github.com/bytecodealliance/wit-bindgen/tree/main/tests/runtime

# Old

To build the Rust examples:

```
$ rustup target add wasm32-wasi
$ cargo build --target wasm32-wasi
```

This will generate the WASI modules in the `target/wasm32-wasi/debug` directory
of each example. Then, change `wasi.js` to use the desired module and arguments.

To build the AssemblyScript examples:

```
$ npm install
$ npm run-script asbuild
```

To transform the `.wat` file into a binary module, use [wat2wasm][wabt] from the
WebAssembly Binary Toolkit:

```
$ wat2wasm wat/hello.wat -o examples/wat/hello.wasm
```

[wabt]: https://github.com/webassembly/wabt
