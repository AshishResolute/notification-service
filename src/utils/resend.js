import { Resend } from "resend";
import { RESEND_API_KEY } from "./index.js";

const resend = new Resend(RESEND_API_KEY);

export async function sendEmail(to,subject,message){
    const {data,error} = await resend.emails.send({
        from:'cloudKitchen <onbording@resend.dev>',
        to,
        subject,
        html:`<strong>${message}</strong>`
    })

    if(error){
        throw new Error(error.message)
    }
    console.log(`Email Sent!`)
}
