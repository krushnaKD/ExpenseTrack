import React from 'react'
import Authlayout from '../../components/Layouts/Authlayout'

const Login = () => {
  return (
    <Authlayout >
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h1 className='text-xl font-semibold text-black'>Welcome back</h1>
        <p className='text-xs text-slate-700 mt-[5px]  mb-6'>Please enter your details to log in</p>
      </div>
    </Authlayout>
  )
}

export default Login
