import { Worker } from "bullmq";
import redis from "../Queues/redis.js";

const emailWorker = new Worker('emailQueue',(job)=>{
    console.log(job.data)
    console.log(`${job.id} Task Completed for ${job.data.message}`)
},{connection:redis})