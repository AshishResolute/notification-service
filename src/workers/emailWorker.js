import { Worker } from "bullmq";
import redis from "../Queues/redis.js";
import { sendEmail } from "../utils/resend.js";
const emailWorker = new Worker('emailQueue',async(job)=>{
    if(job.name==='payment_success'){
        console.log(job.data)
        await sendEmail(job.data.to,job.data.subject,job.data.message)
    }
},{connection:redis})

const phoneMessenger = new Worker('phoneQueue',async(job)=>{
    if(job.name==='payment_failure') console.log(job.data)
},{connection:redis})