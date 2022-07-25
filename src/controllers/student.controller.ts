import { StudentDocument } from "../models/student.model";
import { Response, Request } from "express";
import {
  checkUsernamePassword,
  create,
  deleteStudent,
  find,
  saveCredentials,
  showAll,
  update,
} from "../services/student.service";
import { generateToken } from "../utils/jwt.util";
import { CredentialsDocument } from "../models/credentials.model";

export const createStudentController = async (req: Request, res: Response) => {
  try {
    const token = generateToken(req.body.first_name);
    const reqData = req.body as StudentDocument;
    const data = await create(reqData);
    return res.json({ token: token, user: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const showStudentController = async (req: Request, res: Response) => {
  try {
    const data = await showAll();
    return res.json({ user: data });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const loginStudentController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const isValid = await checkUsernamePassword(username, password);
    if (isValid) {
      const token = generateToken(username);
      return res.status(200).json({ token: token });
    } else {
      return res.status(400).json({ message: "Invalid Username Password" });
    }
  } catch (error) {
    return res.status(402).json({ message: error });
  }
};

export const signupStudentController = async (req: Request, res: Response) => {
  try {
    const credentials = req.body as CredentialsDocument;
    const data = await saveCredentials(credentials);
    return res.status(200).json({ user: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const findStudentController = async (req: Request, res: Response) => {
  try {
    const username = res.locals.username;
    console.log("username", username);
    const data = await find({ first_name: username });
    return res.json({ user: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const updateStudentController = async (req: Request, res: Response) => {
  try {
    const username = res.locals.username;
    const reqBody = req.body;
    const data = await update({ first_name: username }, reqBody);
    return res.json({ user: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const deleteStudentController = async (req: Request, res: Response) => {
  try {
    const username = res.locals.username;
    const data = await deleteStudent({ first_name: username });
    return res.json({ message: `${data?.first_name} is deleted successfully` });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
