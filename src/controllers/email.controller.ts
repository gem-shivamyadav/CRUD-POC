import { MailDataRequired } from "@sendgrid/mail";
import { Request, Response } from "express";
import { sendEmailService } from "../services/email.service";

export const sendEmailController = async (req: Request, res: Response) => {
  const { to, subject, content } = req.body;
  const message: MailDataRequired = {
    to: to,
    from: "shivam.yadav@geminisolutions.com",
    subject: subject,
    text: content,
  };
  try {
    await sendEmailService(message);
    res.send({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(402).send({ message: "Operation failed!", error: error });
  }
};
