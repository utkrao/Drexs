// This function is used to test the functions in the main folders

const { Transaction } = require('@ethereumjs/tx')
const Common = require('@ethereumjs/common').default
const { Chain } = require('@ethereumjs/common')
const bitcore = require('bitcore-lib')
const openpgp = require('openpgp')

const testUtil = {
  async transactionSign(data, tokenKey) {
    const promise = new Promise((resolve, reject) => {
      const privateKey = tokenKey;
      const privKey = Buffer.from(privateKey, 'hex')
      const common = new Common({ chain: Chain.Rinkeby })
      const tx = Transaction.fromTxData(data, { common })
      const signedTx = tx.sign(privKey)
      const serializedTx = signedTx.serialize().toString('hex')
      resolve(`0x${serializedTx}`)
    })
    return promise
  },

  async transactionSignWATT(data, tokenKey) {
    const promise = new Promise((resolve, reject) => {
      const privateKey = tokenKey
      const privKey = Buffer.from(privateKey, 'hex')
      const common = Common.custom({ chainId: 4135 })
      const tx = Transaction.fromTxData(data, { common })
      const signedTx = tx.sign(privKey)
      const serializedTx = signedTx.serialize().toString('hex')
      resolve(`0x${serializedTx}`)
    })
    return promise
  },

  async transactionSignBTC(fromAddress, toAddress, amount, token, txrefs) {
    return new Promise(async (resolve, reject) => {
      const value = amount * 1000000000;
      const privateKey = await new bitcore.PrivateKey(token)
      const transaction = await new bitcore.Transaction()
        .from(txrefs)
        .to([
          {
            address: toAddress,
            satoshis: value
          }
        ])
        .change(fromAddress)
        .fee(8000)
        .sign(privateKey);      
      const hash = transaction.toString();
      const fee = await transaction.getFee();      
      const data =  {
        hash: hash,
        networkFee: fee * Math.pow(10, -8)
      }; 
      console.log("bitcoin data",data);
      resolve(data)
    });       
  },


  async transactionSignDREXS (data,tokenKey) {    
    const promise = new Promise((resolve, reject) => {
      const privateKey = tokenKey
      const privKey = Buffer.from(privateKey, 'hex')
      const common = Common.custom({ chainId: 4135 })
      const tx = Transaction.fromTxData(data, { common })
      const signedTx = tx.sign(privKey)
      const serializedTx = signedTx.serialize().toString('hex')
      resolve(`0x${serializedTx}`)
    })
    return promise
  },

  
  async encrypt (cardDetails,encryptKey) {    
    return new Promise(async (resolve, reject) => {
      const dataToEncrypt = cardDetails
      const decodedPublicKey = Buffer.from(encryptKey.publicKey, 'base64').toString()
      const optionsToencrypt = {
        message: openpgp.message.fromText(JSON.stringify(dataToEncrypt)),
        publicKeys: (await openpgp.key.readArmored(decodedPublicKey)).keys
      }
      await openpgp.encrypt(optionsToencrypt).then((ciphertext) => {
        const data = {
          encryptedData: Buffer.from(ciphertext.data).toString('base64'),
          keyId: encryptKey.keyId
        }
        resolve(data);
      }).catch((err) => reject(err));
    });
   
  },

}

module.exports = testUtil


