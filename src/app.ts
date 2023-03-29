import express from 'express'
require('./config/mongoose')
const app = express()
app.get("/",(req,res)=> res.send("hello from app.ts") )
export default app;
