import mongoose from "mongoose";
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/sakura'

mongoose.connect(DB_URL,{
    socketTimeoutMS: 100000,
    connectTimeoutMS: 100000,
    keepAlive: true
})

mongoose.connection.on('open',()=> console.log("mongoose is connected"))