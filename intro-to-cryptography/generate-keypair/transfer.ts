import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,Keypair,LAMPORTS_PER_SOL
  } from "@solana/web3.js";
  import "dotenv/config";
  import { getKeypairFromEnvironment,airdropIfRequired } from "@solana-developers/helpers";
   
  const suppliedToPubkey = process.argv[2] || null;
   
  if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }
   
  const senderKeypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.SECRET_KEY)));
   
  console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
   
  const toPubkey = new PublicKey(suppliedToPubkey);
   
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
   
  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
  );
   
  const transaction = new Transaction();
   
  const LAMPORTS_TO_SEND = 5000;
   
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  });
   
  transaction.add(sendSolInstruction);
   
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
  ]);
   
  console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
  );
  console.log(`Your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,);