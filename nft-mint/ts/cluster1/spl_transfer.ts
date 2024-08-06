import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../prereqs/wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("36QVzq5wztuawovg49dScgHcBvwZe3truJ2EwGJ5HgyD");

// Recipient address
const to = new PublicKey("guney82WWYTi5QSaqqcQjy9VqrQAAGqRx63LmPT8G74");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        );

        // Specify the amount to transfer (adjust as necessary)
        const amount = 10 * LAMPORTS_PER_SOL;

        // Transfer the new token to the "toTokenAccount" we just created
        const signature = await transfer(
            connection,
            keypair,
            fromTokenAccount.address,
            toTokenAccount.address,
            keypair.publicKey,
            amount
        );
        console.log(`Transfer successful with signature: ${signature}, fromTokenAccount: ${fromTokenAccount.address.toBase58}, toTokenAccount:${toTokenAccount.address.toBase58}, amount:${amount} Lamports`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();