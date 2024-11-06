'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!userInfo.email || !userInfo.password) {
      alert('Please fill out all fields');
      return;
    }

    const data = {
      email: userInfo.email,
      password: userInfo.password,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);

      const { token,name } = response.data;
      
      if (!token) {
        console.error('No token received');
        setErrorMessage('Login failed: No token received');
        return;
      }
      
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('name', name);
      alert('Login successful!');
      router.push('/'); 
    } catch (error) {
      console.error('Error during submission:', error);
      setErrorMessage(
        error.response?.data?.message || error.message || 'An error occurred while logging in'
      );
    }
  };

  return (
    <div className='w-full h-[91vh] bg-gradient-to-b from-blue-500 to-pink-200 flex justify-center items-center relative overflow-hidden'>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>

      <div className='bg-white/30 backdrop-blur-lg rounded-lg shadow-lg p-8 relative z-10 w-1/3 h-1/2'>
        <h2 className='text-center text-2xl font-bold mb-4'>Login</h2>
        {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}
        <form onSubmit={submitHandler} className='flex flex-col space-y-4'>
          <input
            type="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            required
            className="p-3 rounded-lg bg-white/60 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            required
            className="p-3 rounded-lg bg-white/60 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className='mt-4 text-center'>
          Don't have an account? <Link href="/signup" className='text-blue-500 hover:underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
