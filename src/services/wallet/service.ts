import { ethers } from "ethers";
import {PROVIDER, gho} from './constants'
import { sendGho } from "./userop/transfer";

import { getKeyPairFromHash, getGhoBalance } from "./utils";

export class AccountService {
    private linkHash: string;
    private privKey: string;
    public address: string;

    constructor(_linkHash: string){
        this.linkHash = _linkHash;
        this.address = '0x';
        this.privKey ='0x';

    }

    public static async init(
        _linkHash: string,
      ): Promise<AccountService>{
        const instance = new AccountService(_linkHash);
        const {address, privateKey} = await getKeyPairFromHash(_linkHash);
        instance.privKey = privateKey;
        instance.address = address;
        return instance;
    }

    public async getBalance() {
        const balance = await getGhoBalance(this.address);
        return balance;
    }

    public async transferGho(claimerAddress: string) {
        const balance = await gho.balanceOf(this.address);
        const signer = new ethers.Wallet(this.privKey, PROVIDER);
        const hash = await sendGho(signer, this.address, claimerAddress, `${balance}`);
        return hash;
    }

}