'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import { useRouter } from 'next/navigation';
import { IoMdLogIn } from 'react-icons/io';

function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Access localStorage only on the client side
    const storedUsername = localStorage.getItem('name');
    const storedToken = localStorage.getItem('jwtToken');
    setUsername(storedUsername);
    setToken(storedToken);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('name'); // Remove username key if stored under 'name'
    localStorage.removeItem('jwtToken'); // Remove token
    setUsername(null);
    setToken(null);
    router.push('/login');
  };

  return (
    <nav className="w-full h-16 bg-black text-white flex justify-between items-center">
      <Image
        src={logo}
        alt="Logo"
        width={60}
        height={60}
        className="ml-2 cursor-pointer"
        onClick={() => router.push('/')}
      />
      <ul className="flex gap-4 mr-4">
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        {token ? (
          <IoMdLogIn
            className="text-3xl text-red-500 cursor-pointer"
            onClick={logoutHandler}
          />
        ) : (
          <IoMdLogIn
            className="text-3xl text-green-500 cursor-pointer"
            onClick={() => router.push('/login')}
          />
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
