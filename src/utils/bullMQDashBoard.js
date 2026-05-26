import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import {emailQueue,webhookQueue} from '../Queues/queue.js'
const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath('/bullMQ/dashboard');

const {addQueue,removeQueue,setQueues,replaceQueues} = createBullBoard({
    queues:[new BullMQAdapter(emailQueue),new BullMQAdapter(webhookQueue)],
    serverAdapter
})

export default serverAdapter