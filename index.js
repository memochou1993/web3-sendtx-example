require('dotenv').config();

async function main() {
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x72E6c9390ea3B34bFfD534128Cb86afD66B0ae02' // 轉出地址：個人錢包
  
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // 交易次數，從 0 開始，避免雙重支付

    const transaction = {
      to: '0x31B98D14007bDEe637298086988A0bBd31184523', // 轉入地址：Rinkeby faucet
      value: 100, // 100 wei
      gas: 30000,
      maxFeePerGas: 2500000000,
      nonce: nonce,
    };
  
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
  });
};

main();
