import { Outlet } from 'react-router-dom'
import Header from '../components/header'

function MainLayout() {
  return (
    <div className='bg-[#f1f1f1]'>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default MainLayout