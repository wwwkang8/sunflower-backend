import { adjectives, nouns } from "./words";
import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env") });
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";


export const generateSecret = () => {

    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;

};

console.log("유저이름 : " + process.env.SENDGRID_USERNAME);
console.log("비밀번호 : " + process.env.SENDGRID_PASSWORD);

export const sendMail = (email) => {
    
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };

    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};


export const sendSecretMail = (address, secret) => {
    const email = {
        from: "jeongho0812@gmail.com",
        to: address,
        subject: "Login Secret for Prismagram",
        html:  `Hello! Your login secret it ${secret}.<br/>Copy paste on the app/website to login`
    }

    return sendMail(email);
}