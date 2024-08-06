import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../prereqs/wba-wallet.json";
import base58 from "bs58";

// https://arweave.net/hJ39VghmdSLtwpDjEuBQ659Exqlc6E1eCUvQWV2skhU?ext=jpg   -- nft_image


//https://arweave.net/QqCT4YymHOkbsjAzDGW4zyLfuR-_lSVtLW8gwoAwn0I?ext=jpg    -- nft_metadata

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

(async () => {

    const tx = createNft(umi, {
        mint,
        name: "RUG109",
        symbol: "RUG109",
        uri: "https://arweave.net/oPfCnymekeeoAOdOYPzQPSMmUfhZKLHxNWJxvj5zehI?ext=png",
        sellerFeeBasisPoints: percentAmount(1),     // 0-10,000
        creators: null,
    });
    //let tx = await tx.sendAndConfirm(umi);
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);

    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);

    console.log("Mint Address: ", mint.publicKey);
})();