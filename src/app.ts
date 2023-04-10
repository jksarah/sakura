import bodyParser from "body-parser";
import express, { NextFunction } from "express";
import userController from "./user/user.controller";
import cors from 'cors'


require("./config/mongoose");
const app = express();
app.use(bodyParser.json({limit:'50mb'}))
const host = "api/v1"
app.use(cors({credentials:true}))
app.get("/", (req, res) => res.send("hello from app.ts"));
app.use('/api/v1/user',userController)
export default app;