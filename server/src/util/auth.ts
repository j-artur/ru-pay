import { Employee, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { accessTokenSecret, tokenExpireTime } from "./consts";

export interface UserJWT {
  id: number;
  name: string;
  registration: string;
  iat: number;
  exp: number;
}

export const signUserJWT = ({ id, name, registration }: User) => {
  const signedToken = sign({ id, name, registration }, accessTokenSecret, {
    expiresIn: tokenExpireTime,
  });

  return signedToken;
};

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")?.[1];

    if (!token) return res.sendStatus(401);

    const payload = verify(token, accessTokenSecret) as UserJWT;

    if (!payload || !(payload as any).registration) return res.sendStatus(401);

    res.locals["user"] = payload;

    return next();
  } catch (err) {
    res.sendStatus(401);
  }
};

export interface EmployeeJWT {
  id: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export const signEmployeeJWT = ({ id, name, email }: Employee) => {
  const signedToken = sign({ id, name, email }, accessTokenSecret, {
    expiresIn: tokenExpireTime,
  });

  return signedToken;
};

export const authenticateEmployee = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")?.[1];

    if (!token) return res.sendStatus(401);

    const payload = verify(token, accessTokenSecret) as EmployeeJWT;

    if (!payload || !(payload as any).email) return res.sendStatus(401);

    res.locals["employee"] = payload;

    return next();
  } catch (err) {
    res.sendStatus(401);
  }
};

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")?.[1];

    if (!token) return res.sendStatus(401);

    const payload = verify(token, accessTokenSecret);

    if (!payload) return res.sendStatus(401);

    return next();
  } catch (err) {
    res.sendStatus(401);
  }
};
