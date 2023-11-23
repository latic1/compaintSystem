import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
// import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'ddea1121d654dd',
        pass: '598d099adf70df',
      },
    });
    
  
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
    const source = fs.readFileSync(join(__dirname, template), 'utf8');
    
    // const source = fs.readFileSync(path.join(__dirname, template), 'utf8');
    const compiledTemplate = handlebars.compile(source);

    const options = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };

    // Send email
    transport.sendMail(options, (error, info) => {
      if (error) {
        console.error(error);
        // Handle the error, for example, return a Promise.reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        // Handle success, for example, resolve a Promise
      }
    });
  } catch (error) {
    console.error(error);
    // Handle the error, for example, return a Promise.reject(error);
  }
};

export default sendEmail;


// module.exports = sendEmail;

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/