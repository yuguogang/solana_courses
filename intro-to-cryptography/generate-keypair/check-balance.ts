import { Connection, LAMPORTS_PER_SOL, PublicKey,clusterApiUrl } from "@solana/web3.js";
const { PublicKey } = require('@solana/web3.js');

function isValidSolanaAddress(address) {
  try {
    // 尝试创建一个PublicKey实例
    const publicKey = new PublicKey(address);
    // 如果没有异常抛出，则地址格式有效
    return true;
  } catch (error) {
    // 如果有异常抛出，则地址格式无效
    console.error('Invalid Solana address:', error);
    return false;
  }
}
const suppliedPublicKey = process.argv[2];
isValidSolanaAddress(suppliedPublicKey);
 
const connection = new Connection("https://api.mainnet-beta.solana.com");
//check if the suppliedPublicKey valid
if(!connection.isBlockhashValid) {
    throw new Error("Public keyis not valid!");
}
const publicKey = new PublicKey(suppliedPublicKey);
 
const balanceInLamports = await connection.getBalance(publicKey);
 
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
 
console.log(
  `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
);