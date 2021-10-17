const Datauri = require('datauri');
const path = require('path');

const cloudinary = require('../config/cloudinary');
const sgMail = require('@sendgrid/mail');
const nodemailer = require("nodemailer");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function uploader(req) {
    return new Promise((resolve, reject) => {
        const dUri = new Datauri();
        let image = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

        cloudinary.uploader.upload(image.content, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    });
}

function sendEmail(mailOptions) {
    // return new Promise((resolve, reject) => {
    //     sgMail.send(mailOptions, (error, result) => {
    //         if (error) return reject(error);
    //         return resolve(result);
    //     });
    // });

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'parth.chaturvedi.app@gmail.com',
            pass: 'parth@1995'
        }
    });

    let mailOptions1 = {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        html: mailOptions.html
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions1, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });

    // try{   
    //     let info = await transporter.sendMail(mailOptions);
    //     return { error: false };
    // }
    // catch{
    //     console.error("send-email-error", error);
    //     return { error: true };
    // }   
}

module.exports = { uploader, sendEmail };

