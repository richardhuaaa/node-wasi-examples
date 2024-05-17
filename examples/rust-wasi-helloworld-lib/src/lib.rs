#[no_mangle]
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[no_mangle]
pub fn hello() {
    println!("Hello, world!");
}

#[no_mangle]
pub fn return_string() -> String {
    "Returned a string".to_string()
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
