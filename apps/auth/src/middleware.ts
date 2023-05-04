import { NextFunction, Request, Response } from "express";
import { UnprocessableEntity, Conflict } from "http-errors";
import { extractToken, userExists, validateToken } from "authorization";
import {
  loginBodyValidationSchema,
  registerBodyValidationSchema,
} from "./validation.scehma";
import { createUser } from "./http";

export async function validateRegisterBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isValid = registerBodyValidationSchema.validate(req.body);

  if (isValid.error) {
    return next(new UnprocessableEntity(isValid.error.message));
  }

  next();
}

export async function validateLoginBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isValid = loginBodyValidationSchema.validate(req.body);

  if (isValid.error) {
    return next(new UnprocessableEntity(isValid.error.message));
  }

  next();
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const rawToken = extractToken(req);
    const email = validateToken(rawToken);
    const exists = await userExists(email);

    if (exists) {
      return next(new Conflict());
    }

    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  // const user = await some bs response

  res.status(200).json("user logged in");
}
