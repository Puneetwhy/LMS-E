import React from 'react'
import { useNavigate } from 'react-router-dom'

const Denied = () => {

    const navigate = useNavigate();
  return (
    <div>
      <main className='h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]'>
        <h1 className='text-6xl sm:text-8xl lg:text-9xl font-extrabold text-white tracking-widest'>403</h1>
        <div className='bg-black text-white text-xs sm:text-sm px-3 py-1 rounded rotate-12 absolute top-1/3'>Access denied</div>

        <button className="mt-5">
             <a className="relative inline-block text-sm sm:text-base font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
            <span onClick={() => navigate(-1)} className="relative block px-6 sm:px-8 py-2 sm:py-3 bg-[#1A2238] border border-current transition-all duration-300 hover:bg-[#FF6A3D] hover:text-white">
                Go Back
            </span>
            </a>
        </button>
      </main>
    </div>
  )
}

export default Denied
