import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 p-2 2xl:px-20 mx-auto flex justify-between lg:items-center lg:justify-center '>
        <img src={assets.logo}/>
        <p className='flex-1  border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Created By Priyanshu © 2025 Insiderjobs.All rights reserved </p>
        <div className='flex gap-2 '>
            <img width={38} src={assets.facebook_icon}/>
            <img width={38} src={assets.twitter_icon}/>
            <img width={38} src={assets.instagram_icon}/>
        </div>
    </div>
  )
}

export default Footer