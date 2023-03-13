import express from "express";
import {
  getRobots,
  getRobotsById,
  createRobots,
  updateRobots,
  deleteRobots,
  updateInuse,
} from "../controllers/Robot.js";

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/robot", getRobots);
router.get("/robot/:id", verifyUser, adminOnly, getRobotsById);
router.post("/robot", verifyUser, adminOnly, createRobots);
router.patch("/robot/edit/:id", verifyUser, adminOnly, updateRobots);
router.patch("/robot/inuse/:id", verifyUser, updateInuse);
router.delete("/robot/delete/:id", verifyUser, adminOnly, deleteRobots);

export default router;
