import { StudentDocument } from "../models/student";
import { Response, Request } from "express";
import {
  create,
  deleteStudent,
  find,
  showAll,
  update,
} from "../services/student.service";

export const createStudentController = async (req: Request, res: Response) => {
  try {
    const reqData = req.body as StudentDocument;
    const data = await create(reqData);
    // data.save();
    return res.json({ user: data });
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

export const findStudentController = async (req: Request, res: Response) => {
  try {
    const id = req?.headers?.authorization as string;
    const data = await find({ _id: id });
    return res.json({ user: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const updateStudentController = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const id = req?.headers?.authorization as string;
    const data = await update({ _id: id }, reqBody);
    return res.json({ user: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const deleteStudentController = async (req: Request, res: Response) => {
  try {
    const id = req?.headers?.authorization as string;
    const data = await deleteStudent({ _id: id });
    return res.json({ message: `${data?.first_name} is deleted successfully` });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
