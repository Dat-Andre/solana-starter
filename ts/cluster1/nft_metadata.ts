import wallet from "../turbin_wallet.json";
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

        const image = 'https://devnet.irys.xyz/26hdF9hkwNazB9ApAKkxtvYWhC39zjxDpJu1TG9oyngM';
        const metedata = {
            name: "My Rug - UpCenter",
            symbol: "RUC",
            description: "This is a rug from UpCenter",
            image: image,
            attributes: [
                {trait_type: 'color', value: 'blue'},
                {trait_type: 'size', value: 'small'},
                {trait_type: 'vibe', value: 'UpCenter'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: []
        };

        const uploadedMetadata = await umi.uploader.uploadJson(metedata);

        console.log("Your metadata URI: ", uploadedMetadata.replace("arweave.net", "devnet.irys.xyz"));

    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
