import _sodium, { add } from 'libsodium-wrappers-sumo';
import {entropyToMnemonic, mnemonicToSeedSync} from 'bip39';
import {hdkey} from 'ethereumjs-wallet';
import {encode, decode} from 'bs58';
import { gho } from './constants';
import { ethers } from 'ethers';

const DEFAULT_LINK_KEYLENGTH = 20;

export const getGhoBalance = async (address: string) => {
  const balance = await await gho.balanceOf(address);
  return balance;
}

const getSodium = async () => {
    await _sodium.ready;
    return _sodium;
  }

const kdf = async (fullLength: any, pwShort: any, salt: any) => {
    const sodium = await getSodium();
    return sodium.crypto_pwhash(
      fullLength,
      pwShort,
      salt,
      sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
      sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
      sodium.crypto_pwhash_ALG_DEFAULT
    );
  };
  
const randBuf = async (l: any) => {
    const sodium = await getSodium();
    return sodium.randombytes_buf(l);
  };

const kdfz = async (fullLength: any, pwShort: any) => {
    const sodium = await getSodium();
    const salt = new Uint8Array(sodium.crypto_pwhash_SALTBYTES);
    return await kdf(fullLength, pwShort, salt);
  };

const ethKeyPair = async (pw:any) => {
    const sodium = await getSodium();
    const seed = await kdfz(sodium.crypto_sign_SEEDBYTES, pw);

    const mnemonic = entropyToMnemonic(Buffer.from(seed).toString('hex'));
    const hdWallet = hdkey.fromMasterSeed(mnemonicToSeedSync(mnemonic));

    // Get the first account from the wallet (m/44'/60'/0'/0/0)
    const wallet = hdWallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    // Ethereum address
    const address = `0x${wallet.getAddress().toString('hex')}`;
    // Private key
    const privateKey = wallet.getPrivateKey().toString('hex');

    return {address, privateKey}
  }

export const generateRandomKeyPair = async () => {
    await getSodium();
    const b = await randBuf(DEFAULT_LINK_KEYLENGTH);

    const {address, privateKey} = await ethKeyPair(b);
    const hash = encode(b);

    return {hash, address};
}

export const getKeyPairFromHash = async (hash:string) => {
    const buff = decode(hash)
    const {address, privateKey} = await ethKeyPair(buff);
    return {address, privateKey};
}

export const sendGhoTransaction = async (address: string, amount: string) => {
  const tx = await gho.populateTransaction.transfer(address, ethers.utils.parseEther(amount));
  return tx;
}

export const getLinksFromStorage = () => {
  const data = localStorage.getItem('links');
  if(data === null){
    return {links: []}
  }
  return JSON.parse(data);
}

export const addLinkToStorage = (data: any) => {
  const prevData = getLinksFromStorage();
  const newData = prevData
  newData.links.push(data)
  localStorage.setItem('links', JSON.stringify(newData));
}

export const clearStorage = () => {
  localStorage.removeItem('links');
}