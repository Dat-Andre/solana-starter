import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo} from '@solana/spl-token';
import wallet from "../turbin_wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("E63bZBXSFv4vhBsgVueWKq27Dy9EBBibz5jpBNb2vhtN");

(async () => {
    try {
        // Mint to ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`Your ata is: ${ata.address.toBase58()}`);
        const mintToMyself = await mintTo(connection, keypair, mint, ata.address, keypair, 10n * token_decimals);
        console.log(`Your mint txid: ${mintToMyself}`);
        
        const myBalance = await connection.getTokenAccountBalance(ata.address);
        console.log(`Your balance is: ${myBalance.value.uiAmount}`);
        //My ATA 6XG3ZSzbJYTFCWQ7RS8zyU7XUxrxA9m3Dv7xZzZrX54G

    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
