#[allow(warnings)]
mod bindings;

use bindings::exports::exports::Client;
use bindings::exports::exports::Guest;
use bindings::exports::exports::GuestClient;

struct ClientImpl {}

impl GuestClient for ClientImpl {
    fn add(&self, left: u32, right: u32) -> u32 {
        left + right
    }

    fn hello(&self) {
        println!("Hello!");
    }

    fn return_string(&self) -> String {
        "Passed a string from Rust to Node".to_string()
    }

    fn input_string(&self, input: String) {
        println!("{}", input);
    }
}

struct Component;

impl Guest for Component {
    type Client = ClientImpl;

    /// Say hello!
    fn hello_world() -> String {
        "Hello, World!".to_string()
    }

    fn get_client() -> Client {
        Client::new(ClientImpl {})
    }
}

bindings::export!(Component with_types_in bindings);
