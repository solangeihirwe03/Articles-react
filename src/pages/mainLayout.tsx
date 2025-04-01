import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer';

function MainLayout() {
  return (
    <div className='bg-[#f6f6f6] flex flex-col justify-between font-inter'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout