import bs58 from 'bs58'
import * as prompt from 'prompt-sync';

#[test]
fn base58_to_wallet() {
    println!("Enter your name:");
    let stdin = io:: stdin();
    let base58 = stdin.lock().lines().next().unwrap().unwrap();
    //gdtKSTXYULQNx87fdD3YgXkzVeyFeqwtxHm6WdEb5a9YJRnHse7GQr7t5pbepsyvUCk7Vv
    //ksUGhPt4SZ8JHVSkt
    let wallet = bs58:: decode(base58).into_vec().unwrap();
    println!("{:?}", wallet);
}

#[test]
fn wallet_to_base58() {
    let wallet: Vec<u8> =
        vec![215, 4, 179, 27, 163, 215, 14, 123, 77, 201, 104, 179, 203, 11, 214, 164, 81, 209, 240, 92, 38, 1, 139, 165, 14, 36, 55, 148, 156, 116, 152, 249, 177, 197, 92, 21, 27, 29, 100, 243, 64, 237, 29, 60, 204, 79, 111, 159, 7, 146, 130, 144, 125, 236, 149, 44, 6, 75, 9, 16, 184, 117, 111, 31];
    let base58 = bs58:: encode(wallet).into_string();
    println!("{:?}", base58);
}
