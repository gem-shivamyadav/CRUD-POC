import express, { Request, Response } from "express";
import { StudentDocument } from "../models/student";
import {
  create,
  deleteStudent,
  find,
  update,
} from "../services/student.service";

const router = express.Router();

// Test
// router.get("/api/test", (req: Request, res: Response) => {
//   return res.status(200).json({ message: "Hello World" });
// });

// Create Student
router.post("/api/create", async (req: Request, res: Response) => {
  try {
    const reqData = req.body as StudentDocument;
    const data = await create(reqData);
    // data.save();
    return res.json({ user: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// Find Student
router.get("/api/find", async (req: Request, res: Response) => {
  try {
    const id = req?.headers?.authorization as string;
    const data = await find({ _id: id });
    return res.json({ user: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// Update Student
router.put("/api/update", async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const id = req?.headers?.authorization as string;
    const data = await update({ _id: id }, reqBody);
    return res.json({ user: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// Delete Student
router.delete("/api/delete", async (req: Request, res: Response) => {
  try {
    const id = req?.headers?.authorization as string;
    const data = await deleteStudent({ _id: id });
    return res.json({ message: `${data?.first_name} is deleted successfully` });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

export { router as studentRouter };
