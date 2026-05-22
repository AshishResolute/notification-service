import { ErrorHandler } from "../ErrorHandler/globalErrorClass.js";
import { eventSchema } from "../utils/validator/validator.js";
import db from '../db/db.js'
import { emailQueue, phoneQueue } from "../Queues/queue.js";

export let event = async(req,res,next)=>{
    try{
        const {error,value} = eventSchema.validate(req.params);
        if(error) return next(new ErrorHandler(`Invalid input provided`,400,error.message));

        const {event_type,user_id}=value
        const getUserDestination = await db.query(`select channel,destination from subscribers where user_id=$1`,[user_id]);

        if(getUserDestination.rowCount===0) return next(new ErrorHandler(`No subscription found`,404,`user dont have an subscription with ${event_type} yet!`));

        getUserDestination.rows.forEach(async(data)=>{
            if(data.channel==='email') await emailQueue.add('payment_failure',{to:data.destination,message:`Your Payment for the given order Failed!`});
            else if(data.channel==='phone') await phoneQueue.add('payment_failure',{to:data.destination,message:`Your paymet failed for this order!`})
        })
        res.status(200).json({
            success:true,
            message:`notification system triggered,user will recieve message shortly!`,
           timeStamp:new Date().toLocaleString()
        })
    }
    catch(error){
        console.error(`Error:${error.message}`)
        next(error)
    }
}