import sgMail, { MailDataRequired } from "@sendgrid/mail";
import "dotenv/config";

const apiKey = process.env.SENDGRID_KEY;

sgMail.setApiKey(apiKey!);

const sendEmailService = (message: MailDataRequired) => {
  return sgMail.send(message);
};

export { sendEmailService };
