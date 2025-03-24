import { NextFunction, Request, Response } from "express";
import {
  updateUserData,
  fetchUserData,
  fetchAllUserData,
} from "@repository/userCollection";
import type { User } from "@entities/user";
import { ApiError } from "@entities/apiError";

export const updateUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = req.body;
  try {
    await updateUserData(user);
    const userDoc = await fetchUserData(user.id);
    if (!userDoc) {
      throw new ApiError("User not found", 404);
    }
    res
      .status(200)
      .send({ data: userDoc, message: "User data updated successfully" });
  } catch (error) {
    console.log(error);
    next(new ApiError("Failed to update user data", 500));
  }
};

export const fetchUserHandler = async (req: Request, res: Response) => {
  const id = (req as any).id;
  try {
    const user = await fetchUserData(id);
    if (user) res.status(200).json(user);
    else res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const fetchAllUserHandler = async (req: Request, res: Response) => {
  const id = (req as any).id;
  try {
    const user = await fetchAllUserData();
    if (user) res.status(200).json(user);
    else res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
