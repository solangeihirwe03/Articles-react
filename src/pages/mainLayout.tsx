import React from 'react';
import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer';

function MainLayout() {
  return (
    <div className='bg-[#f1f1f1] h-screen flex flex-col justify-between'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout