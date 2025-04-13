import {
  FaFacebook,
  FaTwitterSquare,
  FaInstagramSquare
} from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className='px-6 lg:px-20 mt-6 static bottom-0 bg-[#B9B9B9] lg:h-[40vh] w-full py-2 flex justify-between lg:items-center flex-col overflow-auto md:flex-row'>
      <div className='md:w-1/3'>
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
      <div className='md:w-1/3'>
        <h1 className='font-semibold text-xl pb-5'>Quick links</h1>
        <div className='flex flex-col gap-1'>
          <NavLink to={"/about-me"}>About us</NavLink>
          <NavLink to={"/contact-us"}>Contact us</NavLink>
          <NavLink to={"/"}>Privacy policy</NavLink>
          <NavLink to={"/"}>Terms of use</NavLink>
        </div>
      </div>
      <div className='md:w-1/3'>
        <p className='pb-5 font-medium'>About tech career & development</p>
        <p className="md:text-sm">
          We are dedicated to helping tech professionals grow their careers through insightful articles,
          advice, and resources. Stay updated with the latest trends, career tips, and development insights
          to take your skills to the next level.
        </p>
      </div>
    </div>
  )
}

export default Footer