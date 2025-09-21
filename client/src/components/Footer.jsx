import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
          <div className='flex items-center gap-2'>
            <img src={assets.logoNew} alt="logo" className="h-10 object-contain" />
             <span className="text-2xl font-bold text-black">
            ink2<span className="text-orange-500">Pic</span>
          </span>
          </div>
          <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Shibu | ALL right reserved.</p>
          <div className='flex gap-2.5'>
            <img src={assets.facebook_icon} alt="" width={35}/>
            <img src={assets.twitter_icon} alt="" width={35}/>
            <img src={assets.instagram_icon} alt="" width={35}/>
          </div>
    </div>
  )
}

export default Footer
