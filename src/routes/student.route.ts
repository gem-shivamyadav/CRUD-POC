import express, { Request, Response } from "express";
import {
  findStudentController,
  createStudentController,
  showStudentController,
  updateStudentController,
  deleteStudentController,
} from "../controllers/student.controller";

const router = express.Router();

// Create Student
router.post("/api/create", createStudentController);

// Show Students
router.get("/api/show", showStudentController);

// Find Student
router.get("/api/find", findStudentController);

// Update Student
router.put("/api/update", updateStudentController);

// Delete Student
router.delete("/api/delete", deleteStudentController);

export { router as studentRouter };
