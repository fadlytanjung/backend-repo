import { Router } from "express";
import {
  updateUserHandler,
  fetchUserHandler,
  fetchAllUserHandler,
} from "@controller/api";
import { authMiddleware } from "@middleware/authMiddleware";

const router = Router();

router.put("/update-user-data", authMiddleware, updateUserHandler);
router.get("/fetch-user-data", authMiddleware, fetchAllUserHandler);
router.get("/fetch-user-data/:id", authMiddleware, fetchUserHandler);

export {router as userRoutes};
