"use client";
import React from 'react'
import { ConnectKitButton } from 'connectkit'
import Image from 'next/image';

const Header = () => {
  return (
    <div className='px-4 py-4 flex justify-between items-start'>
        <Image src='/logo.png' alt='logo' width={166} height={166} />
        <ConnectKitButton mode='dark'/>
    </div>
  )
}

export default Header