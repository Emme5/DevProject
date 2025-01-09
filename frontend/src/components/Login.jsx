import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [message, setMessage] = useState("")
    const {loginUser, signUpWithGoogle} = useAuth();
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
      try {
        await loginUser(data.email, data.password);
        alert("ล็อกอินสำเร็จแล้ว");
        navigate("/");
      } catch (error) {
        setMessage("ไม่สามารถลงทะเบียนได้")
        console.error(error)
      }
    }

    const handleGoogleSignIn = async () => {
      try {
        await signUpWithGoogle();
        alert("ล็อกอินสำเร็จแล้ว");
        navigate("/");
      } catch (error) {
        alert("ไม่สามารถล็อกอินได้");
        console.error(error);
      }
    }
  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded 
      px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-extrabold mb-4 flex justify-center'>กรุณาล็อกอิน</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold
            mb-2' htmlFor='email'>อีเมล</label>
            <input 
            {...register("email", { required: true })}
            type='email' name='email' id='email' placeholder='Email Address'
            className='shadow appearance-none border rounded w-full py-2 px-3
            leading-tight focus:outline-none focus:shadow' />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold
            mb-2' htmlFor='password'>รหัสผ่าน</label>
            <input 
            {...register("password", { required: true })}
            type='password' name='password' id='password' placeholder='Password'
            className='shadow appearance-none border rounded w-full py-2 px-3
            leading-tight focus:outline-none focus:shadow' />
          </div>
          {
            message && <p className='text-red-50 text-xs italic
            mb-3'>{message}</p>
          }
          <div>
            <button className='bg-blue-500 hover:bg-blue-800
            text-white font-bold py-2 px-8 rounded focus:outline-none'>ล็อกอิน</button>
          </div>
        </form>
        <p className='align-baseline font-medium mt-4 text-sm'>หากไม่มีบัญชีโปรด
          <Link to="/register" className='text-blue-500 hover:text-blue-700'> ลงทะเบียน</Link>
        </p>

        {/* google sign in */}
        <div className='mt-4'>
          <button 
          onClick={handleGoogleSignIn}
          className='w-full flex flex-wrap gap-1 items-center justify-center
          bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded
          focus:outline-none'>
          <FaGoogle className='mr-2' />
          ล็อกอินโดยใช้ Google
          </button>
        </div>
        <p className='mt-5 text-center text-gray-500 text-sm'>© 2025 Copyright : ร้านขายหนังสือ</p>
      </div>
    </div>
  )
}

export default Login
