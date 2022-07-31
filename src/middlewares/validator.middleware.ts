import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { StudentDocument } from "../models/student.model";

export const usernamePasswordValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const schema = Joi.object().keys({
    username: Joi.string()
      .regex(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
      .required(),
    password: Joi.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required(),
    email: Joi.string().email(),
  });

  try {
    const value = await schema.validateAsync(data);
    console.log("Value", value);
    next();
  } catch (err) {
    console.log("error", err);
    res.json({
      status: "error",
      message: "User Validation Failed",
    });
  }
};

export const studentDetailsValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as StudentDocument;
  const schema = Joi.object().keys({
    first_name: Joi.string().min(3).max(20),
    last_name: Joi.string().min(3).max(20),
    age: Joi.number().min(13).max(80),
    gender: Joi.string().valid("M", "F"),
    subjects: Joi.array().items(Joi.string().required()),
  });

  try {
    const value = await schema.validateAsync(data);
    console.log("Value", value);
    next();
  } catch (err) {
    console.log("error", err);
    res.status(400).json({
      status: "error",
      message: "User Validation Failed",
      data: err,
    });
  }
};
