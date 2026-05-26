import axios from 'axios';

export const makePost = async(to,message,timeStamp,user_id,event_type,channel)=>{
    try{
        const res = await axios.post(to,{
            user_id,
            message,
            event_type,
            channel,
            timeStamp
        })
        console.log(`Post request made successfully`)
    }
    catch(error){
        console.error(`Error:${error.message}`)
        throw error
    }
}