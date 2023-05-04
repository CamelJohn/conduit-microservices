import { Router } from "express";

import {
  login,
  register,
  validateLoginBody,
  validateRegisterBody,
} from "./middleware";

export const router = Router();

router.post("/register", validateRegisterBody, register);

router.post("/login", validateLoginBody, login);
