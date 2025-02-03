'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    try {
        const res = await axios.post(
            'http://localhost:3000/api/Auth/signup', // Make sure the endpoint matches
            { name, email, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (res.status === 201) {
            alert('Signup successful');
        }
    } catch (error) {
        // Display specific error message
        if (error.response) {
            console.error("Server response:", error.response.data);
            alert(error.response.data.message || "Signup failed");
        } else {
            console.error("Error:", error.message);
            alert("An error occurred. Please try again.");
        }
    }
};
  return (
<div className='w-full h-screen bg-gradient-to-b from-blue-500 to-pink-200 flex justify-center items-center relative overflow-hidden'>
  {/* Shine effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>

  <div className='bg-white/30  backdrop-blur-lg rounded-lg shadow-lg p-8 relative z-10 w-1/3 h-1/2'>
    <form onSubmit={handleSignup} className='flex flex-col space-y-4 '>
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Name"
        className="p-3 rounded-lg bg-white/60 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-3 rounded-lg bg-white/60 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="p-3 rounded-lg bg-white/60 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit" 
        className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Sign Up
      </button>
    </form>
  </div>
</div>

  );
}
