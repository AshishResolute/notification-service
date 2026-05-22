import { Worker } from "bullmq";
import redis from "../Queues/redis.js";

const emailWorker = new Worker('emailQueue',async(job)=>{
    if(job.name==='payment_failure') console.log(job.data)
},{connection:redis})

const phoneMessenger = new Worker('phoneQueue',async(job)=>{
    if(job.name==='payment_failure') console.log(job.data)
},{connection:redis})