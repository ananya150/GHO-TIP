"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Tag from './Tag';

const Playground = () => {

    const [type, setType] = useState(0);


  return (
    <div className='flex justify-between w-full'>
        <div className='w-3/4 h-[480px] flex flex-col justify-center items-center '>
            <div className='bg-[#251E33] flex flex-col justify-center items-center w-[480px] h-[280px] rounded-3xl relative'>
                <div className='absolute -top-12 -left-16'>
                    <Tag />
                </div>
                <video src='/gho.mp4' autoPlay muted loop preload='auto' className='h-[230px]' />
            </div>
        </div>
        <div className='w-1/4 flex flex-col'>
            <div className='ml-4'>
                <span className='text-[#DAD1EF] font-sat text-[14px]'>Type</span>
            </div>
            <div className='bg-[#A8A1BA] rounded-3xl mt-2 py-1 px-2 flex w-fit items-center'>
                <div onClick={() => {setType(0)}} className={`${type === 0 ? 'text-[#DAD1EF] bg-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[13px] py-1 px-4 rounded-3xl': 'text-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[13px] py-1 px-4'} `}>
                    Default
                </div>
                <div onClick={() => {setType(1)}} className={`${type === 1 ? 'text-[#DAD1EF] bg-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[13px] py-1 px-4 rounded-3xl': 'text-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[13px] py-1 px-4'} `}>
                    Message
                </div>
                <div onClick={() => {setType(2)}} className={`${type === 2 ? 'text-[#DAD1EF] bg-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[13px] py-1 px-4 rounded-3xl': 'text-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[13px] py-1 px-4'} `}>
                    Image
                </div>
            </div>
        </div>
    </div>
  )
}

export default Playground