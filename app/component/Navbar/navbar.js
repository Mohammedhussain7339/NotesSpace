// components/Navbar/page.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo.png';

function Navbar() {
  return (
    <nav className="w-full h-16 bg-black text-white flex justify-between items-center">
      <Image src={logo} alt="Logo" width={60} height={60} className="ml-2" />
      <ul className="flex gap-4 mr-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/signup">Sign Up</Link></li>
        <li><Link href="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
