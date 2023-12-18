const LoadingCurrentCondition = () => {
    return (
        <div className='grid sm:grid-cols-2 max-sm:grid-cols-2 gap-4 p-4 md:p-6 border mb-3 border-gray-200 rounded-lg shadow animate-pulse dark:border-gray-700'>
            <div role="status">
                <div className="flex items-center max-sm:justify-stretch">
                    <div className="max-sm:h-14 max-sm:pt-2 max-sm:mr-2 max-sm:mt-2 sm:h-12 sm:w-24 sm:mr-4 sm:mt-3 md:h-14 md:w-24 w-24 md:mt-3 xl:w-20 bg-gray-300 rounded-full dark:bg-gray-700">
                        <svg className="max-sm:w-14 max-sm:h-7 max-sm:mt-1 sm:w-6 sm:ml-3 sm:mt-2 md:ml-4 md:mt-3 xl:ml-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                    </div>
                    <div className='w-full'>
                        <div className="h-2 w-4/5 bg-gray-200 rounded-full dark:bg-gray-700 mt-2 max-sm:mt-3 sm:mt-4 md:mt-4 lg:mt-2"></div>
                        <div className="h-2 w-10/12 bg-gray-200 rounded-full dark:bg-gray-700 mt-2"></div>
                        <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2"></div>
                        <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2"></div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className="h-2 w-2/3 bg-gray-200 rounded-full dark:bg-gray-700 mt-2 sm:mt-4 sm:mb-5 md:mt-4 md:mb-1 lg:mb-1"></div>
                </div>
            </div>
            <div role="status">
                <div className="flex justify-end">
                    <div className='w-1/2'>
                        <div className="h-7 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700 mt-2 md:mt-3 sm:mt-3 lg:mt-2"></div>
                        <div className="h-2 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700 mt-2"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-2"></div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className="h-2 w-1/2 bg-gray-200 rounded-full dark:bg-gray-700 sm:mt-5 md:mt-4 mt-3"></div>
                </div>
            </div>
        </div>
    )
}

const LoadingMeteogram = () => {
    return (
        <div className="md:h-[400px] md:w-full py-2 border rounded-lg shadow animate-pulse border-gray-200 dark:border-gray-700">
            <div role="status">
                <div className="flex justify-center items-center flex-col mt-3">
                    <div className="h-4 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-3 w-1/2 mt-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="flex flex-col px-4">
                    <div className="h-2 w-1/3 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-2 w-full mt-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-2 w-full mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-2 w-full mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-2 w-full mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-2 w-full mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-2 w-full mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-2 w-full mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-2 w-full mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-2 w-full mt-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="flex flex-row justify-center px-4 gap-2 mt-3 max-sm:mb-2">
                    <div className="h-3 w-1/5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-3 w-1/5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-3 w-1/5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-3 w-1/5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-3 w-1/5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="flex justify-end px-4 mt-2">
                    <div className="h-2 w-1/5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
            </div>
        </div>
    )
}

const LoadingForecastWeek = () => {

    return (
        <div className="md:h-[550px] xl:h-[537px] md:w-full py-2 px-4 mt-3 pt-5 border rounded-lg shadow animate-pulse border-gray-200 dark:border-gray-700">
            <div role="status">
                <div className="flex justify-center items-center flex-col">
                    <div className="h-4 w-1/3 mt-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="h-3 w-1/6 mt-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="w-full"></div>
                    <div className="w-full">
                        <div className="flex justify-center items-center">
                            <div className="h-3 w-1/3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex justify-center items-center">
                            <div className="h-3 w-1/3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                    </div>
                </div>
                {
                    [1, 2, 3, 4, 5, 6, 7].map((item) => {
                        return (
                            <div className="grid grid-cols-3 gap-3 mt-12" key={item}>
                                <div className="w-full">
                                    <div className="flex justify-start">
                                        <div className="h-3 w-4/6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-center">
                                        <div className="h-3 w-5/6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-center">
                                        <div className="h-3 w-5/6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

const LoadingMapDisplay = () => {
    return (
        <div className="mapRef md:w-full border max-sm:mt-3 rounded-lg shadow animate-pulse border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center mapRef bg-gray-300 rounded dark:bg-gray-700">
                <svg className="w-20 h-20 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                </svg>
            </div>
            <div className="flex flex-row gap-3 mt-4">
                <div className="w-1/6">
                    <div className="h-3 w-full bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="w-full">
                    <div className="h-3 w-full bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="w-full">
                    <div className="h-3 w-5/12 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
            </div>
        </div>
    )
}

export { LoadingCurrentCondition, LoadingMeteogram, LoadingForecastWeek, LoadingMapDisplay }