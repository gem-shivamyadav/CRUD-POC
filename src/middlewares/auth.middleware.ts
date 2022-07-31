import { NextFunction, Request, Response } from "express";
import { findCredentials, find } from "../services/student.service";
import { validateToken } from "../utils/jwt.util";

export const authorize = (allowedAccessTypes: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let jwt = req.headers.authorization;
      if (!jwt) {
        return res.status(401).json({ message: "Unauthorized! Invalid Token" });
      }

      if (jwt.toLowerCase().startsWith("bearer")) {
        jwt = jwt.split(" ")[1];
      }
      console.log("header jwt", jwt);
      const decoded = await validateToken(jwt);
      const hasAccessToEndPoint = allowedAccessTypes.some((path) =>
        decoded.accessTypes.some((allowedPath) => allowedPath === path)
      );
      if (!hasAccessToEndPoint) {
        res.status(401).json({ message: "No privileges to access endpoint" });
      }
      res.locals.username = decoded.username;
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Unauthorized! Invalid Token", error: error });
    }
  };
};

export const checkIfAlreadyExist = async (req: Request, res: Response, next: NextFunction) => {
  const {username} = req.body;
  const exist = await findCredentials(username);
  console.log("exist", exist);
  if(exist) return res.status(409).json({status: 409, message: "error", data: "Username already exist"})
  else return next();
}

export const checkIfDetailsAlreadyExist = async (req: Request, res: Response, next: NextFunction) => {
  const username = res.locals.username;
  const exist = await find(username);
  console.log("exist", exist);
  if(exist?.details) return res.status(409).json({status: 409, message: "error", data: "Student details already exist"})
  else return next();
}