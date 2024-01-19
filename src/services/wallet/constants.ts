import { ethers } from "ethers";
import GHO from "./artifacts/contracts/test/GHO.sol/GHO.json";
import EntryPoint from "./artifacts/contracts/test/EntryPoint.sol/EP.json"
import Account from "./artifacts/contracts/core/Account.sol/LightAccount.json"
import Extractor from "./artifacts/contracts/core/Extractor.sol/Extractor.json"

export const CHAIN_ID = '0xaa36a7';
export const BUNDLER = process.env.NEXT_PUBLIC_ETH_BUNDLER_URL;
export const RPC_URL = process.env.NEXT_PUBLIC_ETH_RPC_URL;
export const PROVIDER = new ethers.providers.JsonRpcProvider(RPC_URL);    
export const DEPLOYERADDRESS = "0x621096843bcDf08F84Ed33E07128ac5daae95A3B";

export const CLAIMERADDRESS = "0x22cfB2F13EB2798fB5F2aBfa254C3f629048e0B5";

export const GHOADDRESS = '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60';
export const ENTRYPOINTADDRESS = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';
export const ACCOUNTADDRESS = '0xd9562f0a5646D9ec70222EC5442C77B87270700c';
export const EXTRACTORADDRESS = '0xaa270FD04220918b8B87777B9d19A2A3686F7272';

export const gho = new ethers.Contract(GHOADDRESS, GHO.abi, PROVIDER);
export const entryPoint = new ethers.Contract(ENTRYPOINTADDRESS, EntryPoint.abi, PROVIDER);
export const account = new ethers.Contract(ACCOUNTADDRESS, Account.abi, PROVIDER);
export const extractor = new ethers.Contract(EXTRACTORADDRESS, Extractor.abi, PROVIDER);

export const extractorInterface = new ethers.utils.Interface(Extractor.abi);
export const accountInterface = new ethers.utils.Interface(Account.abi);