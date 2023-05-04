import { Request } from "express";
import { Unauthorized, BadRequest } from "http-errors";
import Jwt from "jsonwebtoken";

export function extractToken(req: Request) {
  if (!req.headers.authorization) {
    throw new Unauthorized();
  }

  return req.headers.authorization.replace(/Bearer /gi, "");
}

export function decodeToken(rawToken: string) {
  const decoded = Jwt.decode(rawToken);

  if (!decoded) {
    throw new Unauthorized();
  }

  return decoded as Jwt.JwtPayload;
}

export function validateToken(rawToken: string) {
  try {
    Jwt.verify(rawToken, "lies");
    const decoded = decodeToken(rawToken);

    if (!decoded.email) {
      throw new Unauthorized();
    }
    
    return decoded.email as string;
  } catch (error) {
    if (error instanceof Jwt.JsonWebTokenError) {
      throw new Unauthorized(error.message);
    } else {
      throw new BadRequest((error as Error).message);
    }
  }
}
