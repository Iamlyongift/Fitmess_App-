import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

const jwtSecret = process.env.JWT_SECRET as string;

const auth = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: "Kindly sign in as a user" });
    }

    const token = authorization.slice(7, authorization.length);
    let verify = jwt.verify(token, jwtSecret);

    if (!verify) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    const { _id } = verify as { [key: string]: string };

    const user = await UserModel.findById(_id);

   
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    req.user = verify;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
