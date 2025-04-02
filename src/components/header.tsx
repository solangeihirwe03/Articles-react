import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from 'react';

const MobileMenu: React.FC = () => {
    return (
        <div className='bg-[#9c9c9c] mobile-nav'>
            <nav className='flex flex-col gap-8 text-lg font-semibold px-10 text-white'>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/about-me'}>About Us</NavLink>
                <NavLink to={'/create-article'}>article</NavLink>
                <NavLink to={'/contact-us'}>Contact Us</NavLink>
                <NavLink to={"/login"}>Login</NavLink>
            </nav>
            <div className='bg-white border border-[#1E3A8A] rounded-[22px] flex justify-center items-center text-[#1E1E1E]'>
                <input
                    type="search"
                    name='search'
                    placeholder='search here...'
                    className='outline-none border-none px-4 bg-transparent'
                />
                <button
                    className='bg-[#1E3A8A] px-2 py-2 rounded-r-[22px]'
                    aria-label='search-button'
                >
                    <IoIosSearch color='white' />
                </button>
            </div>

        </div>
    )
}

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toogleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className='flex flex-col w-full desktop-nav'>
            <div className='relative'>
                <img
                    src="/binocular.png"
                    alt="background"
                    className='w-full h-[45vh] absolute'
                />
                <div className='absolute bg-black bg-opacity-40 w-full h-[45vh] inset-0 z-10'></div>
                <div className='absolute w-full z-20 text-white flex justify-between px-2 md:px-10 lg:px-20 py-2 font-semibold'>
                    <Link to={"/"}
                        className='text-3xl tracking-wider'
                    >
                        Aspire<span className='text-[#1E3A8A]'>TECH</span>
                    </Link>
                    <Link to={"/login"} className='text-xl hidden md:block'>Login/Sign Up</Link>
                    <button
                        onClick={toogleMenu}
                        className='absolute right-0 px-2 py-2 z-20 block md:hidden'
                        aria-label='menu-toggle'
                    >
                        <AiOutlineMenu color='white' size={30}
                        />
                    </button>
                </div>
                {isMenuOpen && (
                    <div className='absolute z-50 top-10 right-0'>
                        <MobileMenu />
                    </div>
                )}

            </div>
            <div className='md:mt-56 lg:mt-72 xl:mt-[24rem] 2xl:mt-[16rem] md:flex justify-between md:px-10 lg:px-20 hidden'>
                <nav className='flex gap-8 text-lg lg:text-xl font-semibold '>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/about-me'}>About Us</NavLink>
                    <NavLink to={'/create-article'}>article</NavLink>
                    <NavLink to={'/contact-us'}>Contact Us</NavLink>
                </nav>
                <div className='bg-white border border-[#1E3A8A] rounded-[22px] flex justify-center items-center text-[#1E1E1E]'>
                    <input
                        type="search"
                        name='search'
                        placeholder='search here...'
                        className='outline-none border-none px-4 bg-transparent'
                    />
                    <button
                        className='bg-[#1E3A8A] px-2 py-2 rounded-r-[22px]'
                        aria-label='search-button'
                    >
                        <IoIosSearch color='white' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header