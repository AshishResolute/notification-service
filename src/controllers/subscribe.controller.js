import { ErrorHandler } from "../ErrorHandler/globalErrorClass.js"
import { subcriberSchema } from "../utils/validator/validator.js"
import db from '../db/db.js'
import { timeStamp } from "console";
// i need userId,event_type,channel,destination


export let subscribe = async(req,res,next)=>{
    try{
        const {error,value}=subcriberSchema.validate(req.body);
        if(error)return next(new ErrorHandler(`Invalid Input Provided,check again!`,400,error.message));

        const {user_id,event_type,channel,destination}=value

        const addUserSubscription = await db.query(`insert into subscribers(user_id,event_type,channel,destination) values($1,$2,$3,$4) returning *`,[user_id,event_type,channel,destination]);
        if(!addUserSubscription.rowCount) return next(new ErrorHandler(`Insertion Failed`,500,'Database Error'));

        res.status(201).json({
            success:true,
            message:`Subscription Added!`,
            details:`You will notification through ${addUserSubscription.rows[0].channel}`,
            timeStamp:new Date().toLocaleString()
        })
    }
    catch(error){
        console.error(`Error:${error.message}`);
        next(error)
    }
}