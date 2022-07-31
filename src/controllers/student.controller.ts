import { StudentDocument } from "../models/student.model";
import { Response, Request } from "express";
import {omit} from "lodash";
import joi from "joi";
import {
  checkUsernamePassword,
  create,
  deleteStudent,
  find,
  saveCredentials,
  showAll,
  update,
  findCredentials
} from "../services/student.service";
import { generateToken } from "../utils/jwt.util";
import { CredentialsDocument } from "../models/credentials.model";

export const createStudentController = async (req: Request, res: Response) => {
  try {
    const username = res.locals.username;
    const reqData = req.body as StudentDocument;
    const student = await create(reqData, username);
    // const data = await findAndSaveDetails({ username: username }, user._id);
    return res.status(200).json({
      status: 200,
      message: "success",
      data: student,
    });
  } catch (error) {
    return res.status(400).json({ status: "success", message: error });
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
      return res
        .status(200)
        .json({ status: "success", message: "User logged in successfully!", data: { token: token } });
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid Username Password" });
    }
  } catch (error) {
    return res.status(402).json({ status: "error", message: error });
  }
};

export const signupStudentController = async (req: Request, res: Response) => {
  try {
    const credentials = req.body as CredentialsDocument;
    
    const data = await saveCredentials(credentials);
    return res
      .status(200)
      .json({ status: "success", message: "User signed up successfully!", data: data });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error });
  }
};

export const findStudentController = async (req: Request, res: Response) => {
  try {
    const username = res.locals.username;
    var details: any = await find(username);

    // using lodash for omitting password key
    // details = omit(details, 'password') as any;

    return res
      .status(200)
      .json({ status: "success", message: "User credentials found successfully!", data: details });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error });
  }
};

export const updateStudentController = async (req: Request, res: Response) => {
  try {
    const username = res.locals.username;
    const credentials = await findCredentials(username);
    const reqBody = req.body;
    const data = await update({ _id: credentials!.details }, reqBody);
    return res.json({ status: "success", message: "User details updated!", data: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const deleteStudentController = async (req: Request, res: Response) => {
  try {
    const username = res.locals.username;
    const data = await deleteStudent({ first_name: username });
    return res.json({status: "success", message: `${data?.first_name} is deleted successfully` });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error });
  }
};