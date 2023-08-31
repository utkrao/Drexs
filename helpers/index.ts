import * as log from 'electron-log';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip32 from 'bip32';
import { DrexNFTAbi } from './constant';
const TestUtil = require('./testUtils');
const hdKey = require('ethereumjs-wallet/hdkey');
const Web3 = require('web3');
const Hash = require('ipfs-only-hash')
const BTC = bitcoin.networks.testnet;
const web3 = new Web3('https://drexs.devtomaster.com')
const ethWeb3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/d4e4ffb90cda4ed1bf0098d333d2a108'))


export async function convertFromMnemonic(mnemonic) {
  if (!bip39.validateMnemonic(mnemonic)) {
    log.error('Invalid code')
  }
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return {
    BTC: convertToBitcoin(seed, BTC, "m/44'/1'/0'/0/0"),
    WATT: convertToEthereum(seed, "m/44'/6060'/0'/0"),
    ETH: convertToEthereum(seed, "m/44'/60'/0'/0/0"),
    DREXS: convertToEthereum(seed, "m/44'/6060'/0'/0"),
  };
};

function convertToBitcoin(seed, network, path) {
  const wif = bip32
    .fromSeed(seed, network)
    .derivePath(path)
    .toWIF();
  const keyPair = bitcoin.ECPair.fromWIF(wif, network);
  const {
    address
  } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network,
  });
  return {
    publicKey: address,
    privateKey: wif,
  };
};

function convertToEthereum(seed, path) {
  const keyPair = hdKey.fromMasterSeed(seed).derivePath(path);
  return {
    publicKey: keyPair.getWallet().getAddressString(),
    privateKey: keyPair.getWallet().getPrivateKeyString(),
  };
};

export async function sendConfig(req) {
  return new Promise(async (resolve, reject) => {
    try {      
      const { fromAddress, amount, toAddress, contractAddress, coinCode, token, txrefs,tokenId } = req
      const gasPrice = await web3.eth.getGasPrice()
      const tokens = web3.utils.toWei(amount.toString(), 'ether')
      let hash;
      let txCount;
      let transactionFee:any = null;
      const response: any = {
        gasPrice: await web3.utils.toHex(gasPrice)
      }
      if (coinCode === 'DREXS') {        
        txCount = await web3.eth.getTransactionCount(fromAddress, 'pending')
      // console.log('Tc count is', txCount)
      const contract = new web3.eth.Contract(DrexNFTAbi, '0x6f79FC713B96C0e667d0fD98841C9DFD376d03Df')
      const owner = await contract.methods.ownerOf(tokenId).call()
      // console.log('Owner is', owner)
      const gasPrice = await web3.eth.getGasPrice()
      const gasLimit = await web3.utils.toHex(1000000)
      response.data = contract.methods.transfer(toAddress, tokenId).encodeABI()
      response.value = '0x0'
      response.gasPrice = web3.utils.toHex(gasPrice)
      response.to = '0x6f79FC713B96C0e667d0fD98841C9DFD376d03Df'
      response.nonce = await web3.utils.toHex(txCount)
      response.gasLimit = await web3.utils.toHex(gasLimit)
      // console.log('Response is', response)
      hash = await TestUtil.transactionSignDREXS(response,token)

      } else if (coinCode === 'WATT') {
        txCount = await web3.eth.getTransactionCount(fromAddress, 'pending')
        response.gasLimit = await web3.utils.toHex(21000) // 21000
        response.value = await web3.utils.toHex(tokens)
        response.to = toAddress
        response.data = '0x'
        response.nonce = await web3.utils.toHex(txCount);
        hash = await TestUtil.transactionSignWATT(response, token)        
      } else if (coinCode === 'BTC') {
        const btcData = await TestUtil.transactionSignBTC(fromAddress, toAddress, amount, token, txrefs);        
        transactionFee = btcData?.networkFee;
        hash = btcData?.hash;
        // console.log('btcData',btcData);
      } else if (coinCode === 'ETH') {
        txCount = await ethWeb3.eth.getTransactionCount(fromAddress, 'pending')
        // console.log('txCount eth', txCount);
        response.gasLimit = await ethWeb3.utils.toHex(21000); // 21000
        response.value = await ethWeb3.utils.toHex(tokens);
        response.to = toAddress
        response.data = '0x'
        response.nonce = await ethWeb3.utils.toHex(txCount)

        hash = await TestUtil.transactionSign(response, token)
      }      
      if(coinCode !== 'BTC') {        
        transactionFee = gasPrice * response.gasLimit
        transactionFee = await web3.utils.toBN(transactionFee).toString()
        transactionFee = await web3.utils.fromWei(transactionFee, 'ether')
      }      
      resolve({
        transactionFee,
        gasPrice,
        hash
      })
    } catch (e) {
      reject(e);
    }
  })
}

export async function buyConfig(req:any) {
   return new Promise(async (resolve, reject) => {
    try {
      let cardEncryptData = {};
      const {cardDetails,encryptKey,coinCode} = req;
      if (coinCode === 'WATT' || coinCode === 'DREXS') {
        cardEncryptData = await TestUtil.encrypt(cardDetails, encryptKey);
      }  
      resolve(cardEncryptData)
    } catch (error) {
      reject(error);
    } 
   });
}


export async function ipfcHash(req:any) {
  return new Promise(async (resolve, reject) => {
   try {
     let hashData = {};
     const {encryptKey} = req;
     hashData = await Hash.of(encryptKey);
     resolve(hashData)
   } catch (error) {
     reject(error);
   } 
  });
}


export async function swapConfig(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { fromAddress, amount, toAddress, contractAddress, coinCode, token, txrefs } = req
      const gasPrice = await web3.eth.getGasPrice()
      const tokens = web3.utils.toWei(amount.toString(), 'ether')
      let hash;
      let txCount;
      const response: any = {
        gasPrice: await web3.utils.toHex(gasPrice)
      }
      if (coinCode === 'DREXS') {
        txCount = await web3.eth.getTransactionCount(fromAddress, 'pending')
        const contract = new web3.eth.Contract(DrexNFTAbi, contractAddress)
        response.data = contract.methods.transfer(toAddress, web3.utils.toBN(tokens)).encodeABI()
        response.value = '0x0'
        response.to = contractAddress
        response.gasLimit = await web3.utils.toHex(100000)
        response.nonce = await web3.utils.toHex(txCount)
        hash = await TestUtil.transactionSignWATT(response, token)
      } else if (coinCode === 'WATT') {
        txCount = await web3.eth.getTransactionCount(fromAddress, 'pending')
        response.gasLimit = await web3.utils.toHex(21000) // 21000
        response.value = await web3.utils.toHex(tokens)
        response.to = toAddress
        response.data = '0x'
        response.nonce = await web3.utils.toHex(txCount);
        hash = await TestUtil.transactionSignWATT(response, token)
      } else if (coinCode === 'BTC') {
        hash = await TestUtil.transactionSignBTC(fromAddress, toAddress, amount, token, txrefs)
      } else if (coinCode === 'ETH') {
        txCount = await ethWeb3.eth.getTransactionCount(fromAddress, 'pending')
        // console.log('txCount eth', txCount);
        response.gasLimit = await ethWeb3.utils.toHex(21000); // 21000
        response.value = await ethWeb3.utils.toHex(tokens);
        response.to = toAddress
        response.data = '0x'
        response.nonce = await ethWeb3.utils.toHex(txCount)

        hash = await TestUtil.transactionSign(response, token)
      }
         
      resolve({
        gasPrice,
        hash
      })
    } catch (e) {
      reject(e);
    }
  })
}