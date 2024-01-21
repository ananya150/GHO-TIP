"use client";
import { getLinksFromStorage } from '@/services/wallet/utils';
import React, { use, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { Share as ShareIcon } from 'lucide-react';

const Share = ({address}: any) => {

  const linksData = getLinksFromStorage();
  const data = linksData.links[linksData.links.length - 1]

  const copy = () => {
    navigator.clipboard.writeText(`https://gho-tip-three.vercel.app/claim/${data.link}`);
    toast.success('Copied')
  }

  return (
    <div className='flex justify-center w-full'>
        <div className='flex flex-col h-[55vh] justify-between items-center'>
        {
                data.type === 0 &&
                <div className='bg-[#251E33] flex flex-col justify-center items-center w-[450px] h-[320px] rounded-3xl relative'>
                    <div className='absolute -top-12 -left-16'>
                        <Tag amount={data.amount} />
                    </div>
                    <video src='/gho.mp4' autoPlay muted loop preload='auto' className='h-[230px]' />
                </div>
            }
            {
                data.type === 1 &&
                <div className='bg-[#251E33] cursor-pointer px-12 flex flex-col justify-center items-center w-[500px] h-[220px] rounded-t-[5rem] rounded-r-[5rem] relative'>
                    <div className='absolute -top-12 -left-16'>
                        <Tag amount={data.amount} />
                    </div>
                    <div >
                        <div style={{resize: 'none'}} className='text-white text-[35px] outline-none border-none bg-[#251E33]'>{data.message}</div>
                    </div>
                </div>
            }
            {
                data.type === 2 &&
                <div className='bg-[#251E33] cursor-pointer flex flex-col py-8 items-center w-[450px] h-[350px] justify-between rounded-3xl relative'>
                    <div className='absolute -top-12 -left-16 z-10'>
                        <Tag amount={data.amount} />
                    </div>
                    <div>
                        <Image src={data.image} alt='gif' width={400} height={400} className='rounded-2xl max-h-[230px] overflow-clip' />
                    </div>
                    <div className='justify-center flex w-[450px]'>
                        <div className='text-white text-[28px] outline-none border-none text-center bg-[#251E33] w-[420px]'>{data.imageDescription}</div>
                    </div>
                </div>
            }
            {
              <div className='flex space-x-4 items-center'>
                <div className='bg-[#A8A1BA] rounded-3xl py-2 px-4 flex w-fit items-center'>
                    <div className={'text-[#14141B] cursor-pointer font-medium font-sat tracking-tight text-[18px] py-1 px-4'}>
                    https://gho-tip-three.vercel.app/claim/{data.link}
                    </div>
                </div>
                <div onClick={copy}  className='bg-[#A8A1BA] rounded-xl p-2 w-fit cursor-pointer'>
                  <Copy className='text-[#14141B] h-6 w-6' />
                </div>
                {/* <div className='bg-[#A8A1BA] rounded-xl p-2 w-fit cursor-pointer'>
                  <ShareIcon className='text-[#14141B] h-6 w-6' />
                </div> */}
              </div>
            }
        </div>
    </div>
  )
}

export default Share

const Tag = ({amount}: any) => {

  const [integer, setInteger] = useState('');
  const [decimal, setDecimal] = useState('');

  const getDigits = (num: string) => {
      if(num.length === 0){
          setInteger('00');
          setDecimal('00');
          return;
      }
      let parts = num.split('.');
      // If there is no decimal part
      if (parts.length === 1) {
          setInteger(parts[0])
          setDecimal('00');
          return;
      }
      setInteger(parts[0]);
      // If there is no digit after decimal
      if (parts[1].length === 0) {
          setDecimal('00')
          return;
      }
      // If there is only one digit after decimal
      if (parts[1].length === 1) {
          setDecimal(parts[1]+'0')
          return;
      }
      setDecimal(parts[1]);
      return;
  }

  useEffect(() => {
      getDigits(amount);
  }, [amount])

  return(
    <div className='flex items-center space-x-2  px-3 tag rounded-3xl cursor-pointer z-10 relative'>
        <div className='text-[#C8B3F9]'>
            <svg viewBox="0 0 190 143" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className=" h-[19px] w-[25px] rotate-90 fill-vodka dark:fill-violet md:h-[38px] md:w-[45px] lg:h-[38px] lg:w-[51px] xl:h-[38px] xl:w-[60px] ">
                <path fillRule="evenodd" clipRule="evenodd" d="M69.012 0h51.856l16.29 27.068h-67.85v.002c-23.695 0-42.904 19.694-42.904 43.986 0 24.066 18.85 43.618 42.24 43.982h87.646l-26.398-43.979h33.004l26.399 43.979h.303v27.028H69.308v.047c-.844 0-1.684-.016-2.52-.047h-3.066v-.181C28.057 138.969 0 108.371 0 71.056 0 31.915 30.87.164 69.012.001V0ZM79.21 51.016c0 7.475-5.91 13.535-13.202 13.535-7.29 0-13.201-6.06-13.201-13.535 0-7.475 5.91-13.535 13.201-13.535 7.292 0 13.202 6.06 13.202 13.535Zm-13.202 51.017c7.292 0 13.202-6.06 13.202-13.535 0-7.475-5.91-13.535-13.202-13.535-7.29 0-13.201 6.06-13.201 13.535 0 7.475 5.91 13.535 13.201 13.535Z"></path>
            </svg>
        </div>
        <div className='flex items-start'>
            <div className='flex items-center'>
                <span className='text-white text-[65px] font-sat font-bold'>{integer}</span>
            </div>
            <span className='text-white text-[30px] font-sat font-bold mt-2'>.</span>
            <span className='text-white text-[30px] font-sat font-bold mt-2'>{decimal}</span>
        </div>
    </div>
  )
}