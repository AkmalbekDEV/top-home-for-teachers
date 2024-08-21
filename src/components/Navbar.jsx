import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <section className='shadow-md fixed w-full top-0 left-0 z-50 bg-white'>
      <div className='max-w-[1250px] mx-auto'>
      <div className='flex justify-between items-center w-full max-sm:px-5'>
        <div className='flex items-center gap-5'>
          <img onClick={() => navigate('/')} src={Logo} alt="" className='w-[80px] rounded-[50%] my-5 cursor-pointer' />
          <div>
            <h1 className='font-bold tracking-wide text-blue-800 text-lg'>TOP LANGUAGE CENTER</h1>
            <h1 className='tracking-wide text-blue-800 text-sm'>OFFICIAL WEBSITE</h1>
          </div>
        </div>
        <Link to={'https://toplc.uz'} className='text-blue-600 font-medium text-xl'>Website</Link>
      </div>
    </div>
  </section>
  )
}

export default Navbar