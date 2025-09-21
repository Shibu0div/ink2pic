import React, { useState, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { AppContext } from "../context/AppContext"

const ForgotPassword = () => {
  const { backendUrl } = useContext(AppContext)
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleSendOTP = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/send-otp`, { email })
      if (data.success) {
        toast.success("OTP sent to your email")
        setStep(2)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/verify-otp`, { email, otp })
      if (data.success) {
        toast.success("OTP verified")
        setStep(3)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {
        email,
        otp,
        newPassword,
      })
      if (data.success) {
        toast.success("Password reset successful! Please login again.")
        window.location.href = "/" // redirect back to login/home
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center backdrop-blur-sm px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border px-4 py-2 rounded w-full mb-4"
            />
            <button className="bg-black text-white py-2 rounded w-full">Send OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <h1 className="text-2xl font-semibold mb-4">Verify OTP</h1>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="border px-4 py-2 rounded w-full mb-4"
            />
            <button className="bg-black text-white py-2 rounded w-full">Verify OTP</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border px-4 py-2 rounded w-full mb-4"
            />
            <button className="bg-black text-white py-2 rounded w-full">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
