import express from "express";
import {
  getStasiuns,
  getStasiunsById,
  createStasiuns,
  updateStasiuns,
  deleteStasiuns,
} from "../controllers/Stasiun.js";

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/stasiun", getStasiuns);
router.get("/stasiun/:id", getStasiunsById);
router.post("/stasiun", verifyUser, adminOnly, createStasiuns);
router.patch("/stasiun/edit/:id", verifyUser, adminOnly, updateStasiuns);
router.delete("/stasiun/delete/:id", verifyUser, adminOnly, deleteStasiuns);

export default router;
