import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import 'dotenv/config'
import foodRouter from "./routes/foodroutes.js"
import userRouter from "./routes/userRoutes.js"
import cartRouter from "./routes/cartroutes.js"
import orderRouter from "./routes/orderroutes.js"

// app config
const app = express()
const port = process.env.PORT || 8080;

// middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// YOU CAN SAVE UR DATABASE IN THIS COMMENT IF U WANT --> 