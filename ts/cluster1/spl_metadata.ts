import wallet from "../turbin_wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { createMetadataAccountV3, CreateMetadataAccountV3InstructionAccounts, CreateMetadataAccountV3InstructionArgs, DataV2Args } from "@metaplex-foundation/mpl-token-metadata";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("E63bZBXSFv4vhBsgVueWKq27Dy9EBBibz5jpBNb2vhtN");

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mint,
            mintAuthority: signer,
            payer: signer,
            updateAuthority: signer,
        };

        let data: DataV2Args = {
            name: "UpCenter",
            symbol: "UPC",
            uri: "https://arweave.net/k9wnjLLq_a-E92WCS2JOqtPYLnPaVEUreIi9M9eisvo",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
        }

        let args: CreateMetadataAccountV3InstructionArgs = {
            data: data,
            isMutable: true,
            collectionDetails: null,
        };

        let tx = createMetadataAccountV3(umi, {
            ...accounts,
            ...args
        });

        console.log('Sending transaction...');
        let result = await tx.sendAndConfirm(umi);

        console.log(result.result);
        console.log('resulting signature: ', bs58.encode(result.signature));
     
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
