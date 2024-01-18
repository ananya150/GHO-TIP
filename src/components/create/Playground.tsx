"use client";
import React, { use, useState } from 'react';
import Image from 'next/image';
import Tag from './Tag';
import { useModal } from 'connectkit';
import { useAccount } from 'wagmi';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button"

const Playground = () => {

    const [type, setType] = useState(0);
    const {setOpen} = useModal();
    const {isConnected} = useAccount()

    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('Paying you back for last wkend! Thanks bro 🙏')
    const [image, setImage] = useState('https://gho.xyz/dj-clip.gif');
    const [imageDescription, setImageDescription] = useState(`Amazing DJ set.. I'm a fan!!`);

  return (
    <div className='flex justify-between w-full'>
        <div className='w-2/5 ml-16 mt-8'>
            <div className='flex flex-col'>
                <div className='ml-4'>
                    <span className='text-[#DAD1EF] font-sat text-[20px]'>Type</span>
                </div>
                <div className='bg-[#A8A1BA] rounded-3xl mt-4 py-2 px-4 flex w-fit items-center'>
                    <div onClick={() => {setType(0)}} className={`${type === 0 ? 'text-[#DAD1EF] bg-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[18px] py-1 px-4 rounded-3xl': 'text-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[18px] py-1 px-4'} `}>
                        Default
                    </div>
                    <div onClick={() => {setType(1)}} className={`${type === 1 ? 'text-[#DAD1EF] bg-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[18px] py-1 px-4 rounded-3xl': 'text-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[18px] py-1 px-4'} `}>
                        Message
                    </div>
                    <div onClick={() => {setType(2)}} className={`${type === 2 ? 'text-[#DAD1EF] bg-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[18px] py-1 px-4 rounded-3xl': 'text-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[18px] py-1 px-4'} `}>
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
                        <Tag amount={amount} setAmount={setAmount} />
                    </div>
                    <video src='/gho.mp4' autoPlay muted loop preload='auto' className='h-[230px]' />
                </div>
            }
            {
                type === 1 &&
                <div className='bg-[#251E33] px-12 flex flex-col justify-center items-center w-[500px] h-[220px] rounded-t-[5rem] rounded-r-[5rem] relative'>
                    <div className='absolute -top-12 -left-16'>
                        <Tag amount={amount} setAmount={setAmount} />
                    </div>
                    <div>
                        <span className='text-white text-[35px]'>{message}</span>
                    </div>
                </div>
            }
            {
                type === 2 &&
                <div className='bg-[#251E33] flex flex-col py-8 items-center w-[450px] h-[350px] justify-between rounded-3xl relative'>
                    <div className='absolute -top-12 -left-16'>
                        <Tag amount={amount} setAmount={setAmount} />
                    </div>
                    <div>
                        <Image src={image} alt='gif' width={400} height={400} className='rounded-2xl' />
                    </div>
                    <div>
                        <span className='text-white text-[28px]'>{imageDescription}</span>
                    </div>
                </div>
            }
            <div>
                <Button className='text-[24px] w-[350px] bg-[#14141B] hover:bg-[#130f1a] hover:text-white text-[#EBE3FA] py-8 rounded-[3rem] '>Create Link</Button>
            </div>
        </div>
    </div>
  )
}

export default Playground