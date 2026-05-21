import express from 'express'
import { emailQueue } from '../Queues/queue.js';

const app = express();


app.use((err,req,res,next)=>{
    const ErrorMessage={
        message:err.message||`Internal Server Error`,
        timeStamp:new Date().toLocaleString()
    }
    res.status(err.statusCode||500).json(ErrorMessage)
})

export  {app};