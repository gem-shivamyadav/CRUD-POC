import express, { Request, Response } from "express";
import {
  findStudentController,
  createStudentController,
  showStudentController,
  updateStudentController,
  deleteStudentController,
  loginStudentController,
  signupStudentController,
} from "../controllers/student.controller";
import { authorize } from "../middlewares/auth.middleware";

const router = express.Router();

// Test
router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hii" });
});

// Create Student
router.post("/api/create", createStudentController);

// Show Students
router.route("/api/show-all").get(authorize(["show"]), showStudentController);

// Login Student
router.route("/api/login").get(loginStudentController);

// SignUp Student
router.route("/api/signup").post(signupStudentController);

// Find Student
router.route("/api/me").get(authorize(["find"]), findStudentController);

// Update Student
router.route("/api/update").put(authorize(["update"]), updateStudentController);

// Delete Student
router
  .route("/api/delete")
  .delete(authorize(["delete"]), deleteStudentController);

export { router as studentRouter };
