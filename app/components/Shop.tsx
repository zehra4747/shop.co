'use client'
import { useState } from 'react';
import Link from 'next/link'; 
import Image from 'next/image';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center gap-2 relative">
      {/* Make "Shop" clickable */}
      <p 
        className="font-satoshi text-[16px] font-normal leading-[21.6px] cursor-pointer"
        onClick={toggleDropdown}  // Open the dropdown when clicked
      >
        Shop
      </p>
      <Image
        src="/Vector (2).png" 
        alt="Dropdown Icon" 
        className="w-[11.5px] h-[6.5px] cursor-pointer" 
        width={5}
        height={5}
        onClick={toggleDropdown}  // Toggle the dropdown visibility when clicked
      />
      
      {/* Dropdown Menu */}
      <div 
        className={`absolute ${isOpen ? 'block' : 'hidden'} bg-white text-black border shadow-lg top-[100%] left-0 w-max mt-2`}
      >
        <ul className="list-none p-2">
          <li className="py-1 px-3 hover:bg-gray-200 cursor-pointer">
            <Link href="/Products">Details</Link>  
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
