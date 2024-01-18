"use client";
import React from 'react'
import { ConnectKitButton } from 'connectkit'
import Image from 'next/image';
import Navbar from './Navbar';

const Header = ({navbar}: {navbar: boolean}) => {
  return (
    <div className={`px-4 py-4 flex justify-between ${navbar ? 'items-center' : 'items-start'}`}>
          <Image src='/logo.png' alt='logo' width={166} height={166} />
          {navbar && <Navbar /> } 
        <ConnectKitButton mode='dark'/>
    </div>
  )
}

export default Header