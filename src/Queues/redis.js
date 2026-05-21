import {Redis} from 'ioredis'

const redis = new Redis({maxRetriesPerRequest:null});



redis.on('error',(err)=>{
    console.error(`Redis connection failed!`)
})

redis.on('connect',()=>{
    console.log(`Redis connected locally at ${new Date().toLocaleString()}`)

})

export default redis;