"use strict";
const nodemailer = require("nodemailer");
async function nodeMailer(data) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'moncases.id@gmail.com', // generated ethereal user
            pass: 'prjsyaagxvpfdsnt', // generated ethereal password

        },
    });
    let info = await transporter.sendMail({
        from: '"From Job Portal Team', // sender address
        to: data, // list of receivers
        subject: "Congratulations, account created!", // Subject line
        text: "You have created an account", // plain text body
        html: "<b>You have created an account</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = nodeMailer