import nodemailer from 'nodemailer';
import { SENDING_EMAIL, SENDING_EMAIL_PASSWORD } from './reportEmail.js';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: SENDING_EMAIL,
    pass: SENDING_EMAIL_PASSWORD,
  },
});

export { transporter };
