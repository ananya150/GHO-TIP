import { ethers } from "ethers";
import { extractorInterface, EXTRACTORADDRESS, gho } from "../constants";
import { buildOp } from "./account";

export const sendGho = async (signer: ethers.Wallet, signerAddress: string, claimerAddress: string, amount: string) => {

    const deadline = ethers.constants.MaxUint256;

    // transfering with account
    const {v,r,s} = await getPermitSignature(signer , gho , EXTRACTORADDRESS , amount , deadline);
    console.log("Permit signature done")
    
    const extractcd = getExtractorCallData(signerAddress, claimerAddress, amount, deadline, v, r, s, amount);
    console.log("extractor call data done")
    const hash = await buildOp(signer, extractcd);
    return hash
}



export async function getPermitSignature(signer: ethers.Wallet, token: ethers.Contract, spender: string, value: string, deadline: any) {
        
  const [nonce, name, version, chainId] = await Promise.all([
    await token.nonces(signer.address),
    await token.name(),
    "1",
    signer.getChainId(),
  ])

  return ethers.utils.splitSignature(
    await signer._signTypedData(
      {
        name,
        version,
        chainId,
        verifyingContract: token.address,
      },
      {
        Permit: [
          {
            name: "owner",
            type: "address",
          },
          {
            name: "spender",
            type: "address",
          },
          {
            name: "value",
            type: "uint256",
          },
          {
              name: "nonce",
              type: "uint256",
            },
            {
              name: "deadline",
              type: "uint256",
            },
          ],
        },
        {
          owner: signer.address,
          spender,
          value,
          nonce,
          deadline,
        }
      )
    )
  }

export const getExtractorCallData = (deployerAddress: string , claimerAddress: string , value:string , deadline: any , v:any, r:any , s:any, amount:any) => {
  const calldata = extractorInterface.encodeFunctionData("extract", [deployerAddress , claimerAddress , value , deadline , v, r , s, amount]);
  return calldata;
}