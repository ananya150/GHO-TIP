"use client";
import React, { useEffect, useState, useRef } from 'react'

const Tag = ({amount, setAmount}: any) => {

    const [integer, setInteger] = useState('');
    const [decimal, setDecimal] = useState('');

    const inputRef = useRef(null);


    const getDigits = (num: string) => {
        console.log(num)
        if(num.length === 0){
            setInteger('00');
            setDecimal('00');
            return;
        }else if(num.length === 1){
            setDecimal('00');
            setInteger(num);
            return;
        }else if(num.length === 2){
            setDecimal('00');
            setInteger(num);
            return;
        }else if(num.length === 3){
            setDecimal(`${num.charAt(2)}0`);
            setInteger(num.substring(0,2));
            return;
        }else if(num.length === 4){
            setDecimal(num.substring(2,4));
            setInteger(num.substring(0,2));
            return;
        }else{
            return;
        }
    }

    const handleInputChange = (event: any) => {
        const lastChar = event.target.value[event.target.value.length - 1];

        if (lastChar && lastChar.match(/[0-9]/) && event.target.value.length <= 4) {
        setAmount(event.target.value);
        } else if (event.target.value === '') {
        setAmount('');
        }

    }

    useEffect(() => {
        getDigits(amount);
    }, [amount])

  return (
    // @ts-ignore
    <div onClick={() => {inputRef.current!.focus();}} className='flex items-center space-x-2  px-3 tag rounded-3xl cursor-pointer'>
        <div className='text-[#C8B3F9]'>
            <svg viewBox="0 0 190 143" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className=" h-[19px] w-[25px] rotate-90 fill-vodka dark:fill-violet md:h-[38px] md:w-[45px] lg:h-[38px] lg:w-[51px] xl:h-[38px] xl:w-[60px] ">
                <path fillRule="evenodd" clipRule="evenodd" d="M69.012 0h51.856l16.29 27.068h-67.85v.002c-23.695 0-42.904 19.694-42.904 43.986 0 24.066 18.85 43.618 42.24 43.982h87.646l-26.398-43.979h33.004l26.399 43.979h.303v27.028H69.308v.047c-.844 0-1.684-.016-2.52-.047h-3.066v-.181C28.057 138.969 0 108.371 0 71.056 0 31.915 30.87.164 69.012.001V0ZM79.21 51.016c0 7.475-5.91 13.535-13.202 13.535-7.29 0-13.201-6.06-13.201-13.535 0-7.475 5.91-13.535 13.201-13.535 7.292 0 13.202 6.06 13.202 13.535Zm-13.202 51.017c7.292 0 13.202-6.06 13.202-13.535 0-7.475-5.91-13.535-13.202-13.535-7.29 0-13.201 6.06-13.201 13.535 0 7.475 5.91 13.535 13.201 13.535Z"></path>
            </svg>
        </div>
        <div className='flex items-start'>
            <div className='flex items-center'>
                <input ref={inputRef} value={amount} onChange={handleInputChange} className=' text-[60px] text-black w-[1px] outline-none border-none tag' style={{caretColor:'white'}} autoFocus />
                <span className='text-white text-[65px] font-sat font-bold'>{integer}</span>
            </div>
            <span className='text-white text-[30px] font-sat font-bold mt-2'>.{decimal}</span>
        </div>
    </div>
    )
}

export default Tag