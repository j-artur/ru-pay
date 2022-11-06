import { Router } from "express";
import { z } from "zod";
import prisma from "../../prisma";
import { authenticateUser, signUserJWT, UserJWT } from "../../util/auth";
import { hashPassword, verifyPassword } from "../../util/password";

const userAuthRouter = Router();

const registerInput = z.object({
  name: z.string(),
  registration: z.string(),
  password: z.string(),
});

userAuthRouter.post("/register", async (req, res) => {
  try {
    const { name, registration, password } = registerInput.parse(req.body);

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, registration, password: hashedPassword },
    });

    res.status(201).json({ ...user, password: undefined });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

const loginInput = z.object({
  registration: z.string(),
  password: z.string(),
});

userAuthRouter.post("/login", async (req, res) => {
  try {
    const { registration, password } = loginInput.parse(req.body);

    const user = await prisma.user.findFirst({
      where: { registration },
    });

    if (!user) {
      res.sendStatus(401);
    } else if (!(await verifyPassword(password, user.password))) {
      res.sendStatus(401);
    } else {
      const token = signUserJWT(user);
      res.status(200).json({ token });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

userAuthRouter.get("/me", authenticateUser, async (_, res) => {
  try {
    const user = res.locals["user"] as UserJWT;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default userAuthRouter;
