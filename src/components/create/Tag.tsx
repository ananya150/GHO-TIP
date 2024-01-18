import React from 'react'

const Tag = () => {
  return (
    // <div className=" price-tag absolute left-[-50px] top-[-25px] z-overlap flex items-center justify-center gap-[4px] rounded-[11px] bg-onyx-4 px-[14px] py-[10px] dark:bg-medium-purple md:left-[-80px] md:top-[-50px] md:rounded-[25px] md:px-[25px] md:py-[18px] lg:rounded-[23px] xl:rounded-[33px] ">
    <div className='flex items-center space-x-2  px-3 tag rounded-3xl'>
        <div className='text-[#C8B3F9]'>
            <svg viewBox="0 0 190 143" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className=" h-[19px] w-[25px] rotate-90 fill-vodka dark:fill-violet md:h-[38px] md:w-[45px] lg:h-[38px] lg:w-[51px] xl:h-[38px] xl:w-[60px] ">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M69.012 0h51.856l16.29 27.068h-67.85v.002c-23.695 0-42.904 19.694-42.904 43.986 0 24.066 18.85 43.618 42.24 43.982h87.646l-26.398-43.979h33.004l26.399 43.979h.303v27.028H69.308v.047c-.844 0-1.684-.016-2.52-.047h-3.066v-.181C28.057 138.969 0 108.371 0 71.056 0 31.915 30.87.164 69.012.001V0ZM79.21 51.016c0 7.475-5.91 13.535-13.202 13.535-7.29 0-13.201-6.06-13.201-13.535 0-7.475 5.91-13.535 13.201-13.535 7.292 0 13.202 6.06 13.202 13.535Zm-13.202 51.017c7.292 0 13.202-6.06 13.202-13.535 0-7.475-5.91-13.535-13.202-13.535-7.29 0-13.201 6.06-13.201 13.535 0 7.475 5.91 13.535 13.201 13.535Z"></path>
            </svg>
        </div>
        <div className='flex items-start'>
            <span className='text-white text-[65px] font-sat font-bold'>20</span>
            <span className='text-white text-[30px] font-sat font-bold mt-2'>.00</span>
        </div>
    </div>
        // <div className="flex items-start text-white">
        //     <span className=" relative font-tt text-[30px] leading-[30px] tracking-[-2px] md:text-[50px] md:leading-[51px] md:tracking-[-4px] lg:text-[62px] lg:leading-[62px] lg:tracking-[-4px] xl:text-[90px] xl:leading-[90px] xl:tracking-[-6px] ">20</span>
        //     <span className=" font-tt text-[14px] font-bold leading-[16px] tracking-[-1px] md:text-[31px] md:leading-[35px] md:tracking-[-2px] lg:text-[28px] lg:leading-[32px] lg:tracking-[-2px] xl:text-[40px] xl:leading-[46px] xl:tracking-[-3px] ">.00</span>
        //     </div>
        // </div>  
        )
}

export default Tag