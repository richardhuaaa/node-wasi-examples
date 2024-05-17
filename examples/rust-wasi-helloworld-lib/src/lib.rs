use wasm_bindgen::prelude::wasm_bindgen;
// use wasm_bindgen::JsValue;

// #[no_mangle]
#[wasm_bindgen]
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

// #[no_mangle]
#[wasm_bindgen]
pub fn hello() {
    println!("Hello, world!");
}

// #[no_mangle]
#[wasm_bindgen]
pub fn return_string() -> String {
    "Returned a string".to_string()
}

// #[no_mangle]
#[wasm_bindgen]
pub fn input_string(input: String) {
    println!("{}", input);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
