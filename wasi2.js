import * as wasi2 from "./out-dir/rust_wasi2.js";

console.log("Available methods: ", Object.getOwnPropertyNames(wasi2));
console.log(wasi2.helloWorld());
// console.log("1 + 2 = " + add(1, 2));