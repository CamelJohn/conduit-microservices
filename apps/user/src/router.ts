import { Router } from "express";

import {
  canCreate,
  validateCreateBody,
} from "./middleware";

export const router = Router();

router.post("", validateCreateBody, canCreate);

