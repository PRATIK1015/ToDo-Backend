import express from "express";
import asyncHandler from "../utils/async-handler";
import { customError, notFound } from "../utils/errorHandler";
import authRoutes from "./authRoutes";
import todoRoutes from "./todoRoutes";

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/todo', todoRoutes);

router.use(
  "/health",
  asyncHandler(async () => {
    return {
      message: "Hello from Todo BackEnd",
    };
  }),
);

router.use(notFound);
router.use(customError);

export default router;
