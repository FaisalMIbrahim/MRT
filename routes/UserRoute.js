import express from "express";
import {
  getUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  registerUser,
  updateProfileUsers,
} from "../controllers/User.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUsers);
router.get("/users/:id", getUsersById);
router.post("/users", verifyUser, adminOnly, createUsers);
router.post("/register", registerUser);
router.patch("/users/edit/:id", verifyUser, adminOnly, updateUsers);
router.delete("/users/:id", verifyUser, adminOnly, deleteUsers);
router.patch("/profile/:id", updateProfileUsers);

export default router;
