import { Router } from "express";

import {
  login,
  register,
  validateCreateBody,
  validateRegisterBody,
} from "./middleware";

export const router = Router();

router.post("", validateCreateBody);

