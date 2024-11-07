'use client';
import React, { useState, useEffect,useCallback } from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { FaNotesMedical } from "react-icons/fa6";

function Page() {
  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }
  const username = localStorage.getItem('name');
  const [animate, setAnimate] = useState(false);
  const [notes, setNotes] = useState([]);
  const [refresh, setRefresh] = useState(!false);
  const currentDate = new Date().toISOString().split("T")[0];
  const [texts, setTexts] = useState('Hi Noters!');
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  console.log('UserIDHome:', userId);
  const handleColorClick = async (color) => {
    const newItem = { 
      id: Date.now(), 
      color, 
      date: currentDate, 
      text: texts,
      userId
    };

    setNotes((prevItems) => [...prevItems, newItem]);

    try {
      const response = await axios.post('http://localhost:3000/api/notes', newItem);
    
      console.log('Item saved to DB:', response.data);
      setRefresh(prev => !prev);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      // Fetch notes when the component mounts or refreshes
      const fetchNotes = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/notes', {
            params: { userId }
          });
          setNotes(response.data);
        } catch (error) {
          console.error('Error fetching notes:', error);
        }
      };

      fetchNotes();
    }
  }, [userId, refresh]); // Add refresh as dependency to re-fetch when notes are added/updated

  const handleTextChange = useCallback((id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );

    // Debounced function to update the database
    debounceSaveNoteToDB(id, newText);
  }, []);

  const debounceSaveNoteToDB = debounce(async (id, newText) => {
    try {
      await axios.put(`http://localhost:3000/api/notes/${id}`, { text: newText });
      console.log('Note updated:', id);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }, 500);


  const deleteNoteHandler = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/notes/${id}`);
      console.log('Note deleted:', response.data);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
<div className='bg-background w-full h-[90vh] flex justify-center items-center'>
  <div className='w-[95%] sm:w-[85%] lg:w-[70%] h-[75vh] rounded-3xl bg-white overflow-hidden flex flex-col xsm:flex-row shadow-lg'>
    <aside className='w-full h-20 xsm:h-full xsm:w-44  border border-l-2 border-white flex py-4 px-1 xsm:p-0 xsm:justify-center relative '>
      <FaCirclePlus className='xsm:text-[50px] text-2xl xsm:my-12 my-2  cursor-pointer' onClick={() => setAnimate(!animate)} />
      <ul className='absolute top-40 left-16 '>
        <li 
          className={`w-5 h-5 rounded-full cursor-pointer bg-yellow-500 ${animate ? 'absolute my-4 opacity-100 translate-y-2' : 'absolute opacity-0 -translate-y-4'} transition-all duration-300 ease-in-out delay-100`} 
          onClick={() => handleColorClick('bg-yellow-500')}
        ></li>
        <li 
          className={`w-5 h-5 rounded-full cursor-pointer bg-blue-500 ${animate ? 'absolute my-12 opacity-100 translate-y-3' : 'absolute opacity-0 -translate-y-4'} transition-all duration-400 ease-in-out delay-200`} 
          onClick={() => handleColorClick('bg-blue-500')}
        ></li>
        <li 
          className={`w-5 h-5 rounded-full cursor-pointer bg-pink-500 ${animate ? 'absolute my-20 opacity-100 translate-y-4' : 'absolute opacity-0 -translate-y-4'} transition-all duration-500 ease-in-out delay-300`} 
          onClick={() => handleColorClick('bg-pink-500')}
        ></li>
        <li 
          className={`w-5 h-5 rounded-full cursor-pointer bg-sky-500 ${animate ? 'absolute my-28 opacity-100 translate-y-5' : 'absolute opacity-0 -translate-y-4'} transition-all duration-600 ease-in-out delay-400`} 
          onClick={() => handleColorClick('bg-sky-500')}
        ></li>
        <li 
          className={`w-5 h-5 rounded-full cursor-pointer bg-orange-500 ${animate ? 'absolute my-36 opacity-100 translate-y-6' : 'absolute opacity-0 -translate-y-4'} transition-all duration-700 ease-in-out delay-400`} 
          onClick={() => handleColorClick('bg-orange-500')}
        ></li>
        <li 
          className={`w-5 h-5 rounded-full cursor-pointer bg-green-500 ${animate ? 'absolute my-44 opacity-100 translate-y-7' : 'absolute opacity-0 -translate-y-4'} transition-all duration-800 ease-in-out delay-400`} 
          onClick={() => handleColorClick('bg-green-500')}
        ></li>
      </ul>
    </aside>
    <main className='bg-blue-200 w-full h-full px-4 py-4 lg:px-12 overflow-x-auto '>
      <h1 className='text-4xl mx-5 my-3 sm:text-3xl md:text-4xl'>Notes! <span className='capitalize'>{username} </span></h1>
      <div className='flex flex-wrap justify-center items-center gap-4'>
        {notes.map((item) => (
          
          <div
            key={item.id}
            className={`w-[250px]   sm:w-[250px] h-[200px] rounded-2xl ${item.color} shadow-md relative flex flex-col items-center justify-center p-4`}
          >
            <FaNotesMedical className='xsm:block hidden text-xl text-gray-700 absolute right-3 bottom-2 cursor-pointer'
            onClick={() => handleColorClick(item.color) }

            />

            <textarea
              className={`${item.color} outline-none w-[80%] my-3 h-[76vh] sm:w-[90%]`}
              onChange={(e) => handleTextChange(item.id, e.target.value)}
              value={item.text}
            ></textarea>
            <IoCloseCircleSharp className={`text-2xl text-gray-900 absolute right-3 top-2 cursor-pointer`}
              onClick={() => deleteNoteHandler(item.id)}
            />
            <input
              type="date"
              disabled
              value={item.date}
              className={`text-md absolute left-4 ${item.color} bottom-2 cursor-pointer`}
            />
          </div>
        ))}
      </div>
    </main>
  </div>
</div>

  );
}

export default Page;
