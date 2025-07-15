import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message,
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.log(error.message);
    }
}

export default sendEmail;
