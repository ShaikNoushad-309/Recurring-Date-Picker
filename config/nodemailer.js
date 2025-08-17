import nodemailer from 'nodemailer'

// smtp - Simple Mail Transfer Protocol

const transporter = nodemailer.createTransport({
    host:"smtp-relay.brevo.com",
    port:587,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PSWD,
    }
})

export default transporter;