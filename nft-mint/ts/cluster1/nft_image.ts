import wallet from "../prereqs/wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

// https://arweave.net/hJ39VghmdSLtwpDjEuBQ659Exqlc6E1eCUvQWV2skhU   -- nft_image

// https://arweave.net/rI3QjvU1O3k9Ejt-140BFB0gvyPviezmoefddEi6rJA?ext=png  - nft_image2 genrug

//https://arweave.net/QqCT4YymHOkbsjAzDGW4zyLfuR-_lSVtLW8gwoAwn0I    -- nft_metadata
(async () => {
    try {
        //1. Load image
        // Use the absolute path
        const image = await readFile("/Users/gourangaltd/workspace/turbin3/solana-starter/images/generug.png");
        //2. Convert image to generic file.
        const uriImage = createGenericFile(image, "generugger.png", {
            contentType: "image/png",
        });


        //3. Upload image
        const [myUri] = await umi.uploader.upload([uriImage]);
        // const image = ???

        console.log("Your image URI: ", myUri);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
