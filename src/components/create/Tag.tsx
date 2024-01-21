"use client";
import React, { useEffect, useState, useRef } from 'react'

const Tag = ({amount, setAmount, balance}: any) => {

    const [integer, setInteger] = useState('');
    const [decimal, setDecimal] = useState('');

    const inputRef = useRef(null);
    const inputRef2 = useRef(null);

    const getDigits = (num: string) => {
        if(num.length === 0){
            setInteger('00');
            setDecimal('00');
            return;
        }
        let parts = num.split('.');
        // If there is no decimal part
        if (parts.length === 1) {
            //@ts-ignore
            inputRef.current.focus()
            setInteger(parts[0])
            setDecimal('00');
            return;
        }
        setInteger(parts[0]);
        // If there is no digit after decimal
        if (parts[1].length === 0) {
            //@ts-ignore
            inputRef2.current.focus()
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

    const handleInputChange = (event: any) => {
        const { value } = event.target;

        if (/^[0-9]*\.?[0-9]{0,2}$/.test(value) || value === "") {
            setAmount(value);
        } else if (event.target.value === '') {
        setAmount('');
        }

    }

    const activeInput = () => {
        let parts = amount.split('.');
        if(parts.length === 1){

            //@ts-ignore
            inputRef.current.focus()
        }else{
            //@ts-ignore
            inputRef2.current.focus()
        }
    }

    useEffect(() => {
        getDigits(amount);
    }, [amount])

  return (
    // @ts-ignore
    <div onClick={activeInput} className='flex items-center space-x-2  px-3 tag rounded-3xl cursor-pointer z-10 relative'>
        <div className='absolute -top-8 left-4'>
            <span className='font-sat font-semibold text-[#DAD1EF]'>MAX: {balance}</span>
        </div>
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
            <span className='text-white text-[30px] font-sat font-bold mt-2'>.</span>
            <input ref={inputRef2} value={amount} onChange={handleInputChange} className=' text-[25px] mt-3 text-black w-[1px] outline-none border-none tag' style={{caretColor:'white'}} />
            <span className='text-white text-[30px] font-sat font-bold mt-2'>{decimal}</span>
        </div>
    </div>
    )
}

export default Tag