"use client";
import { getLinksFromStorage } from '@/services/wallet/utils';
import React, { use, useEffect, useRef, useState } from 'react';

const Share = ({address}: any) => {
  console.log(address);
  const links = getLinksFromStorage();
  console.log(links);

  return (
    <div className='flex justify-between w-full'>
        <div className='w-2/5 ml-16 mt-8'>
        </div>
    </div>
  )
}

export default Share