import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='bg-[#A8A1BA] rounded-3xl py-1 px-2 flex items-center'>
        <div className='text-[#14141B] cursor-pointer font-semibold font-sat tracking-tight text-[15px] py-2 px-4 ml-2'>
            HOW GHOTIP WORKS
        </div>
        <div className='text-[#14141B] cursor-pointer font-semibold font-sat tracking-tight text-[15px] py-2 px-4 ml-2'>
            DEV DOCS
        </div>
        <Link href='/create' target='_blank' scroll={false} onClick={() => {}} className='text-[#DAD1EF] font-sat cursor-pointer rounded-3xl bg-[#14141B] ml-5 font-semibold tracking-tight text-[15px] py-2 px-4'>
            CREATE LINK
        </Link>
    </div>
  )
}

export default Navbar