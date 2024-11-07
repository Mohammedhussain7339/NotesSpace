"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { IoMdLogIn } from "react-icons/io";

function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [modal, setModal] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");

  useEffect(() => {
    // This will run every time the component mounts or the route changes
    console.log('hi'); // This will log 'hi' in the console every time the page loads

    const storedUsername = localStorage.getItem("name");
    const storedToken = localStorage.getItem("jwtToken");
    const storedUserId = localStorage.getItem("userId");

    setUsername(storedUsername);
    setFirstLetter(storedUsername ? storedUsername.charAt(0).toUpperCase() : "G");

    setToken(storedToken);
    setUserId(storedUserId);
  }, [modal]); // Re-run the effect each time the route changes

  const logHandler = () => {
    setModal(!modal);
  };

  const logoutHandler = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    setUsername(null);
    setToken(null);
    setUserId(null);
  };
  
  return (
    <>
      <nav className="w-full overflow-hidden h-16 rgba text-white flex justify-between items-center">
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={60}
          className="ml-2 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <ul className="flex gap-4 mr-4">
          <div className="w-12 h-12 bg-green-800 rounded-full flex justify-center items-center cursor-pointer">
            <h1 className="text-2xl" onClick={logHandler}>
              {firstLetter}
            </h1>
          </div>
        </ul>
        
        {modal && (
          <div className="w-56 text-black h-56 bg-blue-100 absolute rounded-lg shadow-lg right-0 top-16">
            <div className="flex flex-col justify-center items-center">
              <div className="cursor-pointer w-16 h-16 flex items-center justify-center rounded-full my-1 bg-green-800 text-white text-2xl font-bold">
                {firstLetter}
              </div>
              <h1 className="text-xl capitalize mt-2">
                Welcome, {username ? username : "Guest"}!
              </h1>
            </div>

            <div className="cursor-pointer text-red-500 absolute bottom-4 left-2">
              {token && username ? (
                <div onClick={logoutHandler}>
                  <p className="inline">Logout</p>
                  <IoMdLogIn className="text-xl text-red-500 cursor-pointer inline" />
                </div>
              ) : (
                <div className="flex" onClick={() => router.push("/login")}>
                  <p className="font-bold inline text-green-500">Login</p>
                  <IoMdLogIn className="text-xl inline text-green-500 cursor-pointer" />
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
