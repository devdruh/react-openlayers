import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full bg- bottom-0 sm:absolute bg-[#285430] bg-gradient-to-tr from-emerald-800 to-sky-700 dark:from-emerald-800 dark:to-zinc-800'>
            <div className='divide-y-2 divide-stone-500 px-5'>
                {/* <div className='text-center py-10 text-sm text-green-100'>
                    Footer Links 
                </div> */}
                <div className='text-center py-3 text-xs text-neutral-300'>
                    © { Math.round(new Date().getUTCFullYear())} All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer