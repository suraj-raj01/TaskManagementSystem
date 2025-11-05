import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col "> 
        <div>
            <Navbar/>
        </div>
        <section className='px-10 py-2'>
            <Outlet />
        </section>
    </div>
  )
} 

export default Layout