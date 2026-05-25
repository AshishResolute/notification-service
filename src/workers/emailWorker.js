import { Worker } from "bullmq";
import redis from "../Queues/redis.js";
import { sendEmail } from "../utils/resend.js";
import db from '../db/db.js';
const emailWorker = new Worker('emailQueue',async(job)=>{
    try{
        if(job.name==='payment_success'){
        await sendEmail(job.data.to,job.data.subject,job.data.message,job.data.user_id)
        await db.query(`insert into delivery_logs(user_id,event_type,channel,destination,status,attempts) values($1,$2,$3,$4,$5,$6)`,[job.data.user_id,job.name,'email',job.data.to,'delivered',job.attemptsMade+1])
    }
    }
    catch(error){
        console.error(`Error:${error.message}`);
        await db.query(`insert into delivery_logs(user_id,event_type,channel,destination,status,attempts) values($1,$2,$3,$4,$5,$6)`,[job.data.user_id,job.name,'email',job.data.to,'failed',job.attemptsMade+1])
        throw error
    }
    
},{connection:redis})

emailWorker.on('completed',(job)=>console.log(`job with  id:${job.id} completed`));

emailWorker.on('failed',(job,error)=>console.error(`Job failed with id:${job.id},Error:${error.message}`))