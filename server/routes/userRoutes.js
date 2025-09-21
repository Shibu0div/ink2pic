import express from 'express' 
import {registerUser,loginUser,userCredits,sendOTP,verifyOTP,resetPassword} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredits)

userRouter.post("/send-otp", sendOTP)
userRouter.post("/verify-otp", verifyOTP)
userRouter.post("/reset-password", resetPassword)

export default userRouter

// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login

  