import { exports as wasi2 } from "./out-dir/rust_wasi2.js";

console.log("Available methods at root: ", Object.getOwnPropertyNames(wasi2));
console.log(wasi2.helloWorld());

console.log("Running methods on client");
let client = wasi2.getClient(); 
console.log(client.add(3, 4));
client.hello();
console.log(client.returnString());
client.inputString("Passed a string from Node to Rust");
client.readFile(process.cwd() + "/file.txt");
