const nodemailer = require('nodemailer');
const config = require('../../app/config.js');
 
module.exports = class Mailer {
    constructor() {
        this.mailer = nodemailer.createTransport(config.smtp);
    }
 
    send(to, subject, html, from = `${config.nomDuSite} <${config.smtp.auth.user}>`) {          
        return new Promise((resolve, reject) => {
            this.mailer.sendMail({to, subject, html, from}, (error, info) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }
}
