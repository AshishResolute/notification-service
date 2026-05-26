import { Worker } from "bullmq";
import redis from "../Queues/redis.js";
import { makePost } from "../utils/webhook.js";
import db from "../db/db.js";
const webhookWorker = new Worker(
  "webhookQueue",
  async (job) => {
    try {
      if (job.name === "payment_success")
        await makePost(
          job.data.to,
          job.data.message,
          job.data.timeStamp,
          job.data.user_id,
          job.data.event_type,
          job.data.channel,
        );
      await db.query(
        `insert into delivery_logs(user_id,event_type,channel,destination,status,attempts) values($1,$2,$3,$4,$5,$6)`,
        [
          job.data.user_id,
          job.data.event_type,
          job.data.channel,
          job.data.to,
          "delivered",
          job.attemptsMade + 1,
        ],
      );
    } catch (error) {
      await db.query(
        `insert into delivery_logs(user_id,event_type,channel,destination,status,attempts) values($1,$2,$3,$4,$5,$6)`,
        [
          job.data.user_id,
          job.data.event_type,
          job.data.channel,
          job.data.to,
          "failed",
          job.attemptsMade + 1,
        ],
      );
      throw error;
    }
  },
  { connection: redis },
);


webhookWorker.on('completed',(job)=>{
    console.log(`job with Id:${job.id} completed`)
})

webhookWorker.on('error',(job,error)=>{
    console.error(`job failed with Id:${job.id},Attempts Made:${job.attemptsMade+1}`)
})