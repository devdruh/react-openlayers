import React from 'react';

const Navbar = () => {
    return (
        <>
            <nav className="bg-gradient-to-tr from-gray-50 to-sky-200 border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-20 relative shadow-md">
                <div className="flex flex-wrap justify-between items-center mx-auto p-4">
                    <a href="/" className="flex items-center">
                        {/* <img src='https://via.placeholder.com/120/120&text=LOGO' className='h-8 mr-3 rounded-full' alt='Logo here' /> */}
                        <svg className="w-6 h-6 text-slate-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"/>
                        </svg>
                        <span className="ml-2 text-slate-900 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LOGO</span>
                    </a>
                    
                </div>
            </nav>
        </>
    )
}

export default Navbar