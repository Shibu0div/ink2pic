import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        creditBalance:{type:Number,default:10},
        resetOtp:{type: String,default:null},
        resetOtpExpiry:{type:Date,default:null},
})
const userModel =mongoose.models.user || mongoose.model('User',userSchema)

export default userModel;