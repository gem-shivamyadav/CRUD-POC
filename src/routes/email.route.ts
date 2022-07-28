import express from "express";
import { sendEmailController } from "../controllers/email.controller";

const router = express.Router();

router.post("/api/send-email", sendEmailController);

export { router as emailRouter };
