import userModel from '../models/userModel.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from 'nodemailer'

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all the fields" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword,
    }
    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token, user: { name: user.name } })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token, user: { name: user.name } })
    } else {
      return res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const userCredits = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await userModel.findById(userId)
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    })
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}


const sendOTP = async (req, res) => {
  try {
    const { email } = req.body
    const user = await userModel.findOne({ email })
    if (!user) return res.json({ success: false, message: "User not found" })

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    user.resetOtp = otp
    user.resetOtpExpiry = Date.now() + 5 * 60 * 1000 // 5 min
    await user.save()

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}`,
    })

    res.json({ success: true, message: "OTP sent to email" })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body
    const user = await userModel.findOne({ email })
    if (!user) return res.json({ success: false, message: "User not found" })

    if (user.resetOtp !== otp || user.resetOtpExpiry < Date.now()) {
      return res.json({ success: false, message: "Invalid or expired OTP" })
    }
    res.json({ success: true, message: "OTP verified" })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body
    const user = await userModel.findOne({ email })
    if (!user) return res.json({ success: false, message: "User not found" })

    if (user.resetOtp !== otp || user.resetOtpExpiry < Date.now()) {
      return res.json({ success: false, message: "Invalid or expired OTP" })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)
    user.resetOtp = null
    user.resetOtpExpiry = null
    await user.save()

    res.json({ success: true, message: "Password reset successful" })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}


export { registerUser, loginUser, userCredits, sendOTP, verifyOTP, resetPassword }
