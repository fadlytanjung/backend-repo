import { NextFunction, Request, Response } from "express";
import {
  updateUserData,
  fetchUserData,
  fetchAllUserData,
  fetchIdbyEmail,
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
  const { id } = req.params;
  try {
    const user = await fetchUserData(id);
    if (user) res.status(200).json(user);
    else res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const fetchAllUserHandler = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.page_size as string) || 10;
  const q = (req.query.q as string)?.toLowerCase() || "";

  try {
    const users = await fetchAllUserData();

    const filtered = users.filter(user =>
      user.name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q)
    );

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginated = filtered.slice(start, end);

    res.status(200).json({
      data: paginated,
      meta: {
        total,
        count: paginated.length,
        page,
        page_size: pageSize
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const fetchIdbyEmailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.params;
    const userDoc = await fetchIdbyEmail(email);
    if (userDoc.empty) {
      throw new ApiError("User not found", 404);
    }
    const userId = userDoc.docs[0].id;
    res.status(200).send({ id: userId });
  } catch (error) {
    next(error);
  }
};
