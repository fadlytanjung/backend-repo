import express from "express";
import cors from "cors";
import { userRoutes } from "@routes/userRoutes";
import { ApiError } from "@entities/apiError";

const app = express();

app.use(cors());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(
  (
    err: ApiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: message });
  }
);

export default app;
