import wallet from "../turbin_wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { createMetadataAccountV3, CreateMetadataAccountV3InstructionAccounts, CreateMetadataAccountV3InstructionArgs, DataV2Args, UpdateArgs, updateMetadataAccountV2, UpdateMetadataAccountV2InstructionAccounts, UpdateMetadataAccountV2InstructionArgs } from "@metaplex-foundation/mpl-token-metadata";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("E63bZBXSFv4vhBsgVueWKq27Dy9EBBibz5jpBNb2vhtN");

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

/* (async () => {
    try {
        // Creation 
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
})(); */

(async () => {
    try {
        // Updating 
        let accounts: UpdateMetadataAccountV2InstructionAccounts = {
            metadata: publicKey("DfwU4DyQRUCFcAwJiAX7Sk2Am1FXKZfHJS8tuB4sxHk6"),
            updateAuthority: signer,
        };

        let data: DataV2Args = {
            name: "UpCenter",
            symbol: "UPC",
            uri: "https://arweave.net/dkWBa-NCuNsHLFJGEhryBXQrAqKCyvQv4zpng_hhyng",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
        }

        let args: UpdateMetadataAccountV2InstructionArgs = {
            data: data,
        };

        let tx = updateMetadataAccountV2(umi, {
            ...accounts,
            ...args
        });
        /*  createMetadataAccountV3(umi, {
            ...accounts,
            ...args
        }); */

        console.log('Sending transaction to Update...');
        let result = await tx.sendAndConfirm(umi);

        console.log(result.result);
        console.log('resulting signature: ', bs58.encode(result.signature));
     
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
