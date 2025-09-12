import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { Outlet } from 'react-router'


function App() {

  return (
    <>
      <Navbar />
      <div className='min-h-[calc(100vh-217px)]'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default App
