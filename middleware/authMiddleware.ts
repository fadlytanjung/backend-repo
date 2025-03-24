import { Request, Response, NextFunction } from "express";
import { ApiError } from "@entities/apiError";
import admin from "firebase-admin";

interface DecodedToken {
  userId: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new ApiError("Unauthorized", 401));
  }

  try {
    await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    next(new ApiError("Unauthorized", 401));
  }
};
