import express from 'express'
import { emailQueue } from '../Queues/queue.js';
import subscribe from './subscriber.js'
import morgan from 'morgan'
import events from './event.js'
import serverAdapter from '../utils/bullMQDashBoard.js';
import logs from './stats.js'
const app = express();


app.use(express.json());
app.use(morgan('dev'))
app.use('/subscribe',subscribe)
app.use('/event',events)
app.use('/bullMQ/dashboard',serverAdapter.getRouter())
app.use('/logs',logs)

app.use((err,req,res,next)=>{
    const ErrorMessage={
        message:err.message||`Internal Server Error`,
        internalMessage:err.internalMessage||err.message,
        timeStamp:new Date().toLocaleString()
    }
    res.status(err.statusCode||500).json(ErrorMessage)
})

export  {app};