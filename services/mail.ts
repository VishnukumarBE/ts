import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
dotenv.config()
const transport:Mail=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.MAIL,
        pass:process.env.PASSKEY
    }
})
export default transport