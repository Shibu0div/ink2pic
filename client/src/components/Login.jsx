import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'
const Login = () => {
  const [state, setState] = useState('Login')
  const [showPassword, setShowPassword] = useState(false);

  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
  e.preventDefault()
  try {
    if (state === 'Login') {
      const { data } = await axios.post(backendUrl + '/api/user/login', {
        email,
        password,
      })
      if (data.success) {
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        setShowLogin(false)
      } else {
        toast.error(data.message)
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/user/register', {
        name,
        email,
        password,
      })
      if (data.success) {
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        setShowLogin(false)
      } else {
        toast.error(data.message)
      }
    }
  } catch (error) {
    toast.error(error.message)
  }
}



  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
      className="fixed inset-0 z-10 backdrop-blur-sm flex justify-center items-center"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative bg-white rounded-xl shadow-2xl w-[420px] max-w-full min-h-[400px] overflow-hidden p-10"
      >
        
        {/* Sign Up */}
        
        <form
          onSubmit={onSubmit}
          className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center px-8 ${
            state === 'Login'
              ? 'opacity-0 translate-x-full z-10'
              : 'opacity-100 translate-x-0 z-20'
          }`}
        >
          <h1 className="text-2xl text-neutral-700 font-medium mb-2">Sign Up</h1>
          <p className="text-sm text-slate-500 mb-4">
            Create your account to get started
          </p>

          <div className="border px-6 py-2 flex items-center gap-2 rounded-full w-full">
            <img src={assets.profile_icon} alt="" className="size-5 -ml-1" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none text-sm w-full"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4 w-full">
            <img src={assets.email_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none text-sm w-full"
              type="email"
              placeholder="Email Id"
              required
            />
          </div>
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4 w-full">
      <img src={assets.lock_icon} alt="" />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="outline-none text-sm w-full"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        required
      />
      <img
        src={showPassword ? assets.hide : assets.view}
        alt="toggle visibility"
        className="size-5 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      />
    </div>

          <button
            type="submit"
            className="bg-black w-full text-white py-2 rounded-full mt-6"
          >
            Create Account
          </button>
          <p className="mt-5 text-center text-sm">
            Already have an account?{' '}
            <span
              className="text-orange-500 cursor-pointer"
              onClick={() => setState('Login')}
            >
              Login
            </span>
          </p>
        </form>

        
        <form
          onSubmit={onSubmit}
          className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center px-8 ${
            state === 'Login'
              ? 'opacity-100 translate-x-0 z-20'
              : 'opacity-0 -translate-x-full z-10'
          }`}
        >
          <h1 className="text-2xl text-neutral-700 font-medium mb-2">Login</h1>
          <p className="text-sm text-slate-500 mb-4">
            Welcome back! Please sign in to continue
          </p>

          <div className="border px-6 py-2 flex items-center gap-2 rounded-full w-full">
            <img src={assets.email_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none text-sm w-full"
              type="email"
              placeholder="Email Id"
              required
            />
          </div>
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4 w-full">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none text-sm w-full"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p className="text-sm text-orange-600 my-4 cursor-pointer">
            <Link to="/forgot-password" onClick={() => setShowLogin(false)}>Forgot password?</Link>
            
          </p>
          <button
            type="submit"
            className="bg-black w-full text-white py-2 rounded-full"
          >
            Login
          </button>
          <p className="mt-5 text-center text-sm">
            Don&apos;t have an account?{' '}
            <span
              className="text-orange-500 cursor-pointer"
              onClick={() => setState('Sign Up')}
            >
              Sign up
            </span>
          </p>
        </form>
        
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer z-30"
        />
      </motion.div>
    </motion.div>
  )
}

export default Login
