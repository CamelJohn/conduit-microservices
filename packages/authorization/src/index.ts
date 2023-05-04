import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "http-errors";
import { authorizationHeaderSchemaValidation } from "./schema.validation";
export { extractToken, validateToken } from "./helpers";
export { userExists } from './http';

export async function isAuthorizd(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const hasAuthorization = authorizationHeaderSchemaValidation.validate(
    req.headers
  );

  if (hasAuthorization.error) {
    return next(new Unauthorized(hasAuthorization.error.message));
  }

  next();
}

// export async function isAuthenticated(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const rawToken = extractToken(req);
//     const email = validateToken(rawToken);
//     const exists = await userExists(email);

//     if (!exists) {
//       return next(new Unauthorized());
//     }
    
//     next();
//   } catch (error) {
//     next(error);
//   }
// }
