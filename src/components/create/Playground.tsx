"use client";
import React, { use, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Tag from './Tag';
import { useModal } from 'connectkit';
import { useAccount } from 'wagmi';
import { ChevronDown } from 'lucide-react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ReloadIcon } from "@radix-ui/react-icons"
import { addLinkToStorage, clearStorage, generateRandomKeyPair, getGhoBalance, sendGhoTransaction } from '@/services/wallet/utils';
import { ethers } from 'ethers';
import toast from 'react-hot-toast'
import { AlertCircle } from 'lucide-react';
import { useSendTransaction, useWaitForTransaction } from 'wagmi' 
import { useRouter } from 'next/navigation'
import { db } from '@/utils/db';

const defaultMessage = 'Paying you back for last wkend! Thanks bro 🙏';
const defaultDescription = "Amazing DJ set.. I'm a fan!!"
const defaultImage = '/dj.gif';


const Playground = () => {

    const [type, setType] = useState(0);
    const {setOpen} = useModal({onDisconnect: () => {
        setBalance('0.0');
    }});
    const {isConnected, address} = useAccount()
    const textAreaRef = useRef(null);
    const inputRef = useRef(null);
    const {  data , sendTransaction, isError } = useSendTransaction() 
    const {
        data: txReceipt,
        error: txError,
        isLoading: txLoading,
        isSuccess,
        status
      } = useWaitForTransaction({ confirmations: 1, hash: data?.hash });

    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState(defaultMessage)
    const [image, setImage] = useState(defaultImage);
    const [imageDescription, setImageDescription] = useState(defaultDescription);
    const [connected , setConnected] = useState(false);
    const [loading, setLoading] = useState(false)
    const [balance, setBalance] = useState('0.0');
    const [toastId, setToastId] = useState<any>(null);
    const [newAddress, setNewAddress] = useState('');
    const [hashLink, setHashLink] = useState('');
    const router = useRouter();

    const [dropdownInput, setDropdownInput] = useState('');

    const handleMessageTextArea = () => {
        //@ts-ignore
        textAreaRef.current!.focus();
        if(message === defaultMessage){
            setMessage('')
        }
    }


    const handleMessageInputArea = () => {
        //@ts-ignore
        inputRef.current!.focus();
        if(imageDescription === defaultDescription){
            setImageDescription('')
        }
    }


    const handleChangeTab = (tabIndex: number) => {
        if(type === tabIndex){
            return;
        }
        setMessage(defaultMessage);
        setImageDescription(defaultDescription);
        setImage(defaultImage);
        setDropdownInput('');
        setType(tabIndex);
    }

    const handleButtonClick = async () => {

        setLoading(true);

        if(parseFloat(amount) > parseFloat(balance)){
            invalidAmountToast()
            setLoading(false)             
            return;
        }
        // generate hash and address for link
        const newPair = await generateRandomKeyPair()
        setNewAddress(newPair.address)
        setHashLink(newPair.hash);
        const tx = await sendGhoTransaction(newPair.address, amount);
        sendTransaction(tx as any);
    }

    const handleConnectWallet = () => {
        if(!isConnected){
            setOpen(true);
            return;
        }
    }

    const fetchBalance = async () => {
        const balance = await getGhoBalance(address!);
        setBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(2))
    }

    useEffect(() => {
        setConnected(isConnected);
        // clearStorage()
        if(isConnected){
            fetchBalance()
        }
    }, [image, isConnected, address])

    useEffect(() => {
        if(isError){
            toast.error("Transaction Rejected");
            setLoading(false)
            return;
        }
        if(status === "loading"){
            const tId = toast.loading('Waiting for transaction');
            setToastId(tId);
            return;
        }
        if(status === "success"){
            handleTransactionConfirmation()
        }
        if(status === "error"){
            toast.dismiss(toastId);
            toast.error("Transaction Failed");
            setLoading(false)
            return;
        }

    }, [status, isError])

    const handleTransactionConfirmation = async () => {
        toast.dismiss(toastId);
        toast.success("Transaction Confirmed");

        let data;
        if(type === 0){
            data = {
                type: 0,
                amount: amount,
                message: '',
                image: '',
                imageDescription: '',
                link: hashLink,
                toAddress: newAddress,
                isClaimed: false
            }
        }else if(type === 1){
            data = {
                type: 1,
                amount: amount,
                message: message,
                image: '',
                imageDescription: '',
                link: hashLink,
                toAddress: newAddress,
                isClaimed: false
            }
        }else if(type === 2){
            data = {
                type: 2,
                amount: amount,
                message: '',
                image: image,
                imageDescription: imageDescription,
                link: hashLink,
                toAddress: newAddress,
                isClaimed: false
            }
        }
        addLinkToStorage(data);
        setLoading(false);
        //@ts-ignore
        delete data?.link
        try{
            await db.set(newAddress, data);
        }catch(e){
            console.log("Error occured while saving");
        }
        router.push(`/create/${newAddress}`)
        return;
    }

    const invalidAmountToast = () => {
        toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <AlertCircle className='text-yellow-700' />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Invalid Amount
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Max {balance}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )) 
    }

  return (
    <div className='flex justify-between w-full'>
        <div className='w-2/5 ml-16 mt-8'>
            <div className='flex flex-col'>
                <div className='bg-[#A8A1BA] rounded-3xl mt-28 ml-2 py-2 px-4 flex w-fit items-center'>
                    <div onClick={() => {handleChangeTab(0)}} className={`${type === 0 ? 'text-[#DAD1EF] bg-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[24px] py-1 px-4 rounded-3xl': 'text-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[24px] py-1 px-4'} `}>
                        Default
                    </div>
                    <div onClick={() => {handleChangeTab(1)}} className={`${type === 1 ? 'text-[#DAD1EF] bg-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[24px] py-1 px-4 rounded-3xl': 'text-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[24px] py-1 px-4'} `}>
                        Message
                    </div>
                    <div onClick={() => {handleChangeTab(2)}} className={`${type === 2 ? 'text-[#DAD1EF] bg-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[24px] py-1 px-4 rounded-3xl': 'text-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[24px] py-1 px-4'} `}>
                        Image
                    </div>
                </div>
                {/* <div onClick={() => {setOpen(true)}} className='bg-[#251E33] rounded-3xl mt-5 py-2 px-2 flex justify-between w-[235px] items-center cursor-pointer'>
                <div/>
                <div className='text-gray-400 text-[13px]'>
                        {isConnected ? 'Asset: GHO' : 'Connect Wallet'}
                    </div> 
                    {isConnected ? <ChevronDown className='text-gray-400 w-3 h-3' /> : <div/>}
                </div> */}

            </div>
        </div>
        <div className='w-3/5 h-[55vh] justify-between flex flex-col items-center '>
            {
                type === 0 &&
                <div className='bg-[#251E33] flex flex-col justify-center items-center w-[450px] h-[320px] rounded-3xl relative'>
                    <div className='absolute -top-12 -left-16'>
                        <Tag balance={balance} amount={amount} setAmount={setAmount} />
                    </div>
                    <video src='/gho.mp4' autoPlay muted loop preload='auto' className='h-[230px]' />
                </div>
            }
            {
                type === 1 &&
                <div className='bg-[#251E33] cursor-pointer px-12 flex flex-col justify-center items-center w-[500px] h-[220px] rounded-t-[5rem] rounded-r-[5rem] relative'>
                    <div className='absolute -top-12 -left-16'>
                        <Tag balance={balance} amount={amount} setAmount={setAmount} />
                    </div>
                    <div onClick={handleMessageTextArea} >
                        <textarea ref={textAreaRef} style={{resize: 'none'}} value={message} onChange={(e) => {setMessage(e.target.value)}} className='text-white text-[35px] outline-none border-none bg-[#251E33]'></textarea>
                    </div>
                </div>
            }
            {
                type === 2 &&
                <div className='bg-[#251E33] cursor-pointer flex flex-col py-8 items-center w-[450px] h-[350px] justify-between rounded-3xl relative'>
                    <div className='absolute -top-12 -left-16 z-10'>
                        <Tag balance={balance} amount={amount} setAmount={setAmount} />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className='absolute top-[50%] -left-16 bg-white px-2 py-2 rounded-xl'>
                                <Upload />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 py-2 px-2">
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input value={dropdownInput} onChange={(e) => {setDropdownInput(e.target.value)}} type="url" placeholder="Link" className='outline-none focus:border-gray-200 focus:outline-none focus:ring-0' />
                                <Button onClick={() => {setImage(dropdownInput)}} type="submit">Insert</Button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div onClick={handleMessageInputArea}>
                        <Image src={image} alt='gif' width={400} height={400} className='rounded-2xl max-h-[230px] overflow-clip' />
                    </div>
                    <div onClick={handleMessageInputArea} className='justify-center flex w-[450px]'>
                        <input ref={inputRef} value={imageDescription} onChange={(e) => {setImageDescription(e.target.value)}} className='text-white text-[28px] outline-none border-none text-center bg-[#251E33] w-[420px]'></input>
                    </div>
                </div>
            }
            {
                connected ?
                (
                    loading ?
                    <div>
                        <Button disabled onClick={handleButtonClick} className='text-[24px] cursor-not-allowed w-[350px] bg-[#14141B] hover:bg-[#130f1a] hover:text-white text-[#EBE3FA] py-8 rounded-[3rem] flex '>
                            <ReloadIcon className="h-4 w-4 animate-spin mr-6" />
                            Please wait
                        </Button>
                    </div>
                    :
                    <div>
                        <Button onClick={handleButtonClick} className='text-[24px] w-[350px] bg-[#14141B] hover:bg-[#130f1a] hover:text-white text-[#EBE3FA] py-8 rounded-[3rem] '>Create Link</Button>
                    </div>
                )
                :
                <div>
                    <Button onClick={handleConnectWallet} className='text-[24px] w-[350px] bg-[#14141B] hover:bg-[#130f1a] hover:text-white text-[#EBE3FA] py-8 rounded-[3rem] '>Connect Wallet</Button>
                </div>
            }
        </div>
    </div>
  )
}

export default Playground