import React, { use, useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './components/ForgotPassword';
import Home from './pages/Home'
import  Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { AnimatePresence } from 'framer-motion'
const App = () => {
  const {showLogin}=useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28
    min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      <AnimatePresence mode='wait'>
      {showLogin && <Login/>}
       </AnimatePresence>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
          
      
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
