import sgMail, { MailDataRequired } from "@sendgrid/mail";

const apiKey =
  "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";

sgMail.setApiKey(apiKey);

const sendEmailService = (message: MailDataRequired) => {
  return sgMail.send(message);
};

export { sendEmailService };
