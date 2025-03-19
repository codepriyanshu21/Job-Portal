import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-20'>
        <div className='relative bg-gradient-to-r from-violet-50 to-indigo-50 p-12 sm:p-24 lg:p-32 rounded-lg'>
            <div>
                <h1 className='text-2xl sm:text-4xl text-center font-bold mb-8 max-w-md'>Download Mobile App For Better Experience</h1>
                <Link to='#' className='flex gap-4 md:items-start md:justify-start items-center justify-center '>
                    <img className='h-12' src={assets.play_store}/>
                    <img className='h-12' src={assets.app_store}/>
                </Link>
            </div>
            <img className='absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden' src={assets.app_main_img}/>
        </div>
    </div>
  )
}

export default AppDownload