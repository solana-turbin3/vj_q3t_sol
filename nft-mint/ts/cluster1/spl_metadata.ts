import wallet from "../prereqs/wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey as publicKeySerializer, string } from '@metaplex-foundation/umi/serializers';
import bs58 from "bs58";
import {
    createMetadataAccountV3,
    CreateMetadataAccountV3InstructionAccounts,
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";

// Define our Mint address
const mint = publicKey("36QVzq5wztuawovg49dScgHcBvwZe3truJ2EwGJ5HgyD")

// Metadata program address
const tokenMetadataProgramId = publicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(signer));

const metadataProgramId = publicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

// Each seed must be serialized as a Uint8Array
const seeds = [string({ size: 'variable' }).serialize('metadata'),
publicKeySerializer().serialize(tokenMetadataProgramId),
publicKeySerializer().serialize(mint),
];

const [metadataPDA] = umi.eddsa.findPda(tokenMetadataProgramId, seeds);


(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint,
            mintAuthority: signer,
            updateAuthority: keypair.publicKey
        };

        let data: DataV2Args = {
            name: "Sing Fungible Token",
            symbol: "SING",
            uri: "https://example.com/token.json", // URL to the metadata JSON file
            sellerFeeBasisPoints: 0, // Seller fee is usually 0 for fungible tokens
            creators: null, // Optional: array of creators
            collection: null,
            uses: null
        };

        let args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable: true,
            collectionDetails: null
        }

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        )

        let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
        console.log(`Succesfully Minted!. Transaction Here: https://explorer.solana.com/tx/${bs58.encode(result.signature)}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
