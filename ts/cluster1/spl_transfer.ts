import { Commitment, Connection, Keypair, PublicKey } from "@solana/web3.js"
import wallet from "../turbin_wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("E63bZBXSFv4vhBsgVueWKq27Dy9EBBibz5jpBNb2vhtN");

// Recipient address
const to = new PublicKey("AvtnGAecfa12nRBwR4usTWtYBXD1jkNH263dsHhg55yZ");
const token_decimals = 1_000_000n;

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const ataFrom = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);

        // Get the token account of the toWallet address, and if it does not exist, create it
        const ataTo = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);

        // Transfer the new token to the "toTokenAccount" we just created
        const transferTx = await transfer(connection, keypair, ataFrom.address, ataTo.address, keypair, 2n * token_decimals);

        console.log(`Your transfer txid: ${transferTx}`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();