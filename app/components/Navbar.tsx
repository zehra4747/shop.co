"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import DropdownMenu from './Shop';
import Image from 'next/image';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <header className="h-[38px] bg-[#000000] flex justify-center items-center px-4 sm:px-8 max-sm:h-[34px] max-sm:w-full">
  <h2 className="text-white font-satoshi font-normal leading-[18.9px] text-xs sm:text-sm text-center max-sm:text-[10px] max-sm:leading-[14px]">
    Sign up and get 20% off to your first order.{" "}
    <b className="underline decoration-solid">Sign Up Now</b>
  </h2>
    <div className="w-[20px] h-[20px] absolute right-4 hidden sm:block">
    <Image
      src="/Vector (1).png"
      alt="Icon"
      className="w-full h-full object-contain"
      width={5}
      height={5}
    />
  </div>
</header>

<div className="h-5 md:h-5"></div>

            <div className="w-full max-w-[1240px] h-[41px] flex items-center justify-between px-4 sm:px-8">
                <div className="w-[160px] h-[22px]">
                    <Link href="/" className="text-[32px] font-extrabold leading-[38.4px] sm:text-[32px]">
                        SHOP.CO
                    </Link>
                </div>

                <div className="hidden md:flex flex-1 justify-center items-center">
                    <div className="mt-5 flex items-center gap-4 md:gap-6 text-sm sm:text-base">
                        <div className="flex items-center gap-2">
                            <DropdownMenu />
                        </div>

                        <div>
                            <Link href="/Products" className="font-satoshi text-[16px] font-normal leading-[21.6px] whitespace-nowrap">
                                On Sale
                            </Link>
                        </div>

                        <div>
                            <Link href="/Products" className="font-satoshi text-[16px] font-normal leading-[21.6px] whitespace-nowrap">
                                New Arrivals
                            </Link>
                        </div>

                        <div>
                            <Link href="/brands" className="font-satoshi text-[16px] font-normal leading-[21.6px]">
                                Brands
                            </Link>
                        </div>

                       <SearchBar/>
                    </div>
                </div>

                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} aria-label="Toggle menu" className="text-white focus:outline-none">
                        {isMenuOpen ? <AiOutlineClose size={30} className='text-black' /> : <AiOutlineMenu size={30} className='text-black' />}
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/cart">
                        <Image src="/Vector (4).png" width={20} height={20} alt="Cart Icon" className="w-[22px] h-[20px]" />
                    </Link>
                 <Link href="/login">  <Image src="/Vector (5).png" width={20} height={20} alt="User Icon" className="w-[22px] h-[20px]" />
                 </Link> </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden py-4 px-4 bg-[#000000] text-white mt-2">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <DropdownMenu />
                        </div>

                        <div>
                            <Link href="/Products" className="font-satoshi text-[16px] font-normal leading-[21.6px] whitespace-nowrap text-white" onClick={toggleMenu}>
                                On Sale
                            </Link>
                        </div>

                        <div>
                            <Link href="/Products" className="font-satoshi text-[16px] font-normal leading-[21.6px] whitespace-nowrap" onClick={toggleMenu}>
                                New Arrivals
                            </Link>
                        </div>

                        <div>
                            <Link href="/brands" className="font-satoshi text-[16px] font-normal leading-[21.6px]" onClick={toggleMenu}>
                                Brands
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-200 rounded-full w-full h-[48px] p-[12px_16px]">
                            <Image src="/Vector (3).png" alt="Search Icon" width={20} height={20} className="w-[20px] h-[20px]" />
                            <input 
                                type="text" 
                                placeholder="Search for products..." 
                                className="bg-transparent text-[16px] text-gray-600 focus:outline-none w-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
