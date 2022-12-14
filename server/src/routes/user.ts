import { Router } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { exclude, idParam } from "../util";
import { authenticateUser } from "../util/auth";
import { hashPassword, verifyPassword } from "../util/password";

const userRouter = Router();

const searchParams = z.object({
  name: z.string().optional(),
  registration: z.string().optional(),
});

userRouter.get("/", async (req, res) => {
  try {
    const params = searchParams.parse(req.query);

    const users = await prisma.user.findMany({
      where: {
        name: { contains: params.name },
        registration: params.registration,
      },
    });

    res.status(200).json(users.map(user => exclude(user, "password")));
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);

    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      res.status(200).json(exclude(user, "password"));
    } else {
      res.sendStatus(404);
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

const updateInput = z.object({
  name: z.string().optional(),
  registration: z.string().optional(),
  password: z.string().optional(),
  currentPassword: z.string(),
});

userRouter.put("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);
    const input = updateInput.parse(req.body);

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const isPasswordValid = await verifyPassword(
      input.currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      res.sendStatus(401);
      return;
    }

    const hashedPassword =
      input.password && (await hashPassword(input.password));
    const data = {
      ...input,
      password: hashedPassword,
      currentPassword: undefined,
    };
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    res.status(200).json(exclude(updatedUser, "password"));
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

userRouter.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.sendStatus(404);
      return;
    }

    await prisma.user.delete({ where: { id } });

    res.sendStatus(204);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

export default userRouter;
