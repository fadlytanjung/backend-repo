import { Router } from "express";
import {
  updateUserHandler,
  fetchUserHandler,
  fetchAllUserHandler,
  fetchIdbyEmailHandler,
} from "@controller/api";
import { authMiddleware } from "@middleware/authMiddleware";

const router = Router();

router.put("/update-user-data", authMiddleware, updateUserHandler);
router.get("/fetch-user-data", authMiddleware, fetchAllUserHandler);
router.get("/fetch-user-data/:id", authMiddleware, fetchUserHandler);
router.get("/fetch-id-by-email/:email", authMiddleware, fetchIdbyEmailHandler);

export {router as userRoutes};
