import { Router } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { idParam } from "../util";
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
      select: {
        id: true,
        name: true,
        registration: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });

    res.status(200).json(users);
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
      select: {
        id: true,
        name: true,
        registration: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
    if (user) {
      res.status(200).json(user);
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

const createInput = z.object({
  name: z.string(),
  registration: z.string(),
  password: z.string(),
});

userRouter.post("/", async (req, res) => {
  try {
    const input = createInput.parse(req.body);

    const hashedPassword = await hashPassword(input.password);
    const data = { ...input, password: hashedPassword };
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        registration: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });

    res.status(201).json(user);
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

userRouter.put("/:id", async (req, res) => {
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
      select: {
        id: true,
        name: true,
        registration: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

userRouter.delete("/:id", async (req, res) => {
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
