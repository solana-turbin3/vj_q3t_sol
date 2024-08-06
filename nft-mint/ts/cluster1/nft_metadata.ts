import wallet from "../prereqs/wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://arweave.net/rI3QjvU1O3k9Ejt-140BFB0gvyPviezmoefddEi6rJA?ext=png";
        const metadata = {
            name: "RUG109",
            symbol: "RUG109",
            description: "Rug109!!",
            image,
            attributes: [
                { trait_type: 'SpaceWidth', value: '5390', axe: '5' }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://arweave.net/rI3QjvU1O3k9Ejt-140BFB0gvyPviezmoefddEi6rJA?ext=png"
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your image URI: ", myUri);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
