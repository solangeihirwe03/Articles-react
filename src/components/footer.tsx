import React from 'react'
import {
  FaFacebook,
  FaTwitterSquare,
  FaInstagramSquare
} from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className='px-20 mt-10 bg-[#B9B9B9] h-[40vh] w-full py-2 flex justify-between items-center'>
      <div className=' w-1/3'>
        <h1
          className='text-3xl tracking-wider pb-7'
        >
          Aspire<span className='text-[#1E3A8A]'>TECH</span>
        </h1>
        <div>
          <h3 className='text-2xl pb-2'>Follow us</h3>
          <div className='flex gap-2'>
            <FaFacebook color='white' size={30} />
            <FaTwitterSquare color='white' size={30} />
            <FaInstagramSquare color='white' size={30} />
            <AiFillTikTok color='white' size={30} />
          </div>
        </div>
      </div>
      <div className='w-1/3'>
        <h1 className='font-semibold text-xl pb-5'>Quick links</h1>
        <div className='flex flex-col gap-1'>
          <NavLink to={"/"}>About us</NavLink>
          <NavLink to={"/"}>Contact us</NavLink>
          <NavLink to={"/"}>Privacy policy</NavLink>
          <NavLink to={"/"}>Terms of use</NavLink>
        </div>
      </div>
      <div className='w-1/3'>
        <p className='pb-5 font-medium'>About tech career & development</p>
        <p>
          We are dedicated to helping tech professionals grow their careers through insightful articles,
          advice, and resources. Stay updated with the latest trends, career tips, and development insights
          to take your skills to the next level.
        </p>
      </div>
    </div>
  )
}

export default Footer