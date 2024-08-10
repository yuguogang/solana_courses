import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,Keypair,LAMPORTS_PER_SOL
  } from "@solana/web3.js";
  import "dotenv/config";
  import { getKeypairFromEnvironment,airdropIfRequired } from "@solana-developers/helpers";
   
   
  const senderKeypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.SECRET_KEY)));

  console.log(`senderKeypair.publickey: ${senderKeypair.publicKey.toBase58()}`);
   
   
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
   
  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
  );
await airdropIfRequired(
    connection,
    senderKeypair.publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL,
  );
  console.log(
    `✅ airdroped`
  );

  