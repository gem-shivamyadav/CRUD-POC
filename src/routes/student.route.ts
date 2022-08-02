import express, { Request, Response } from "express";
import {
  findStudentController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
  loginStudentController,
  signupStudentController,
  createExcelSheet,
  downloadExcelSheet,
} from "../controllers/student.controller";
import {
  authorize,
  checkIfAlreadyExist,
  checkIfDetailsAlreadyExist,
} from "../middlewares/auth.middleware";
import {
  studentDetailsValidator,
  usernamePasswordValidator,
} from "../middlewares/validator.middleware";

const router = express.Router();

// Test
router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hii" });
});

// Show Students
// router.route("/api/show-all").get(authorize(["show"]), showStudentController);
router.route("/api/show-all").get(createExcelSheet);

// Download Students excel sheet
router.route("/files/:fileName").get(downloadExcelSheet);

// Login Student
router
  .route("/api/login")
  .get(usernamePasswordValidator, loginStudentController);

// SignUp Student
router
  .route("/api/signup")
  .post(
    usernamePasswordValidator,
    checkIfAlreadyExist,
    signupStudentController
  );

// Register Student
router.post(
  "/api/register",
  authorize(["register"]),
  studentDetailsValidator,
  checkIfDetailsAlreadyExist,
  createStudentController
);

// Find Student
router.route("/api/me").get(authorize(["find"]), findStudentController);

// Update Student
router
  .route("/api/update")
  .put(authorize(["update"]), studentDetailsValidator, updateStudentController);

// Delete Student
router
  .route("/api/delete")
  .delete(authorize(["delete"]), deleteStudentController);

export { router as studentRouter };
