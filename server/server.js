import exprees from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';



const PORT = process.env.PORT || 4000
const app = exprees()

app.use(exprees.json())
app.use(cors())
await connectDB()

// Define Rout0es
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.get('/',(req,res)=>res.send("API running"))

app.listen(PORT,()=>console.log('Server running on port '+PORT))

