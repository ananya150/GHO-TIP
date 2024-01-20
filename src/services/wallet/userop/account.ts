import { ACCOUNTADDRESS, BUNDLER, CHAIN_ID, ENTRYPOINTADDRESS, EXTRACTORADDRESS, accountInterface,  } from "../constants";

import { BigNumberish, BytesLike, ethers } from "ethers";
import { UserOperationBuilder, BundlerJsonRpcProvider, UserOperationMiddlewareFn, Client, Presets } from "userop";
import { signUserOpHash, estimateUserOperationGas, getGasPrice } from "userop/dist/preset/middleware";
import { EntryPoint, EntryPoint__factory } from "userop/dist/typechain";

export class SimpleAccount extends UserOperationBuilder {
  private signer: ethers.Signer;
  private provider: ethers.providers.JsonRpcProvider;
  private entryPoint: EntryPoint;
  private initCode: string;
  private nonceKey: number;
  private sender: string;
  private interface: ethers.utils.Interface

  private constructor(
    signer: ethers.Signer,
    rpcUrl: string,
    sender: string
  ) {
    super();
    this.signer = signer;
    this.provider = new BundlerJsonRpcProvider(rpcUrl);
    this.entryPoint = EntryPoint__factory.connect(
      ENTRYPOINTADDRESS,
      this.provider
    );
    this.sender = sender;
    this.initCode = "0x";
    this.nonceKey = 0;
    this.interface = accountInterface
  }

  private resolveAccount: UserOperationMiddlewareFn = async (ctx: any) => {
    const [nonce] = await Promise.all([
      this.entryPoint.getNonce(ctx.op.sender, this.nonceKey),
    ]);
    ctx.op.nonce = nonce;
    ctx.op.initCode = "0x";
  };

  public static async init(
    signer: ethers.Signer,
    rpcUrl: string,
    sender: string
  ): Promise<SimpleAccount> {
    const instance = new SimpleAccount(signer, rpcUrl, sender);

    const base = instance
      .useDefaults({
        sender: instance.sender,
        signature: await instance.signer.signMessage(
          ethers.utils.arrayify(ethers.utils.keccak256("0xdead"))
        ),
      })
      .useMiddleware(instance.resolveAccount)
      .useMiddleware(getGasPrice(instance.provider));

    // const withPM = opts?.paymasterMiddleware
    //   ? base.useMiddleware(opts.paymasterMiddleware)
    //   : base.useMiddleware(estimateUserOperationGas(instance.provider));
    const withPM = base.useMiddleware(estimateUserOperationGas(instance.provider));
    return withPM.useMiddleware(signUserOpHash(instance.signer));
  }

  execute(to: string, value: BigNumberish, data: BytesLike) {
    return this.setCallData(
      this.interface.encodeFunctionData("execute", [to, value, data])
    );
  }

  executeBatch(to: Array<string>, data: Array<BytesLike>) {
    return this.setCallData(
      this.interface.encodeFunctionData("executeBatch", [to, data])
    );
  }
}


export const buildOp = async (signer: ethers.Wallet ,calldata: string) => {
    const simpleAccount = await SimpleAccount.init(
        signer, // Any object compatible with ethers.Signer
        BUNDLER!,
        ACCOUNTADDRESS
      ); 
    const client = await Client.init(BUNDLER!);

    const res = await client.sendUserOperation(
      simpleAccount.execute(EXTRACTORADDRESS, 0, calldata),
      { onBuild: (op: any) => console.log("Signed UserOperation:", op) }
    );
    console.log(`UserOpHash: ${res.userOpHash}`);
    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`)
    return ev?.transactionHash;
}

