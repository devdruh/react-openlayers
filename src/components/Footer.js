import React from 'react'

const Footer = () => {
    return (
        // md:bottom-0 md:absolute
        <footer className='w-full translate-y-full relative bg-[#285430] bg-gradient-to-tr from-emerald-800 to-sky-700 dark:from-emerald-800 dark:to-zinc-800'>
            <div className='divide-y-2 divide-stone-500 px-5'>
                {/* <div className='text-center py-10 text-sm text-green-100'>
                    Footer Links 
                </div> */}
                <div className='text-center py-3 text-xs text-neutral-300'>
                    © { Math.round(new Date().getUTCFullYear())} All Rights Reserved. Dev - <a href='https://github.com/devdruh'>Andrew Ragadio</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer