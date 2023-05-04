import { NextFunction, Request, Response } from "express";
import { UnprocessableEntity } from "http-errors";
import {
  loginBodyValidationSchema,
  registerBodyValidationSchema,
} from "./validation.scehma";

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
