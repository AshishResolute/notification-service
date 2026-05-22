import { ErrorHandler } from "../ErrorHandler/globalErrorClass.js";
import { eventSchema } from "../utils/validator/validator.js";
import db from "../db/db.js";
import { emailQueue, phoneQueue } from "../Queues/queue.js";

export let event = async (req, res, next) => {
  try {
    const { error, value } = eventSchema.validate(req.body);
    if (error)
      return next(
        new ErrorHandler(`Invalid input provided`, 400, error.message),
      );

    const { event_type, user_id } = value;
    const getUserDestination = await db.query(
      `select channel,destination from subscribers where user_id=$1 and event_type=$2`,
      [user_id,event_type],
    );

    if (getUserDestination.rowCount === 0)
      return next(
        new ErrorHandler(
          `No subscription found`,
          404,
          `user dont have an subscription with ${event_type} yet!`,
        ),
      );

    // Here moved from forEach as it doesn't waits for the jobs to get added to the queue ,because of which few jobs would never be added if the function hits the res
    // Learnt that for of loop waits for async tasks,but here all the tasks are independent so learnt about promise.all() which can handle tasks parallely where as for of loop does it sequentially
    // for(const data of getUserDestination.rows){
    //     if(data.channel==='email') await emailQueue.add('payment_failure',{to:data.destination,message:`Your Payment for the given order Failed!`});
    //     else if(data.channel==='phone') await phoneQueue.add('payment_failure',{to:data.destination,message:`Your paymet failed for this order!`})
    // }


    // here .map returns an array of pending promises to promise.all() which waits for all the promises to resolve/reject here the promises are resolved parallely
    await Promise.all(
      getUserDestination.rows.map(async (data) => {
        if (data.channel === "email")
          await emailQueue.add(event_type, {
            to: data.destination,
            message: `Your Payment for the given order Failed!`,
          });
        else if (data.channel === "phone")
          await phoneQueue.add(event_type, {
            to: data.destination,
            message: `Your paymet failed for this order!`,
          });
      }),
    );
    res.status(200).json({
      success: true,
      message: `notification system triggered,user will recieve message shortly!`,
      timeStamp: new Date().toLocaleString(),
    });
  } catch (error) {
    console.error(`Error:${error.message}`);
    next(error);
  }
};
