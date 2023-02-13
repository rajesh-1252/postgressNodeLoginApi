import express from "express";
import {
  getAllEmployee,
  login,
  register,
  updateEmployee,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllEmployee);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateEmployee/:id").patch(updateEmployee);

export default router;
