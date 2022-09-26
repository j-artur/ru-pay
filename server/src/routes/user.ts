import { Router } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { idParam } from "../util";
import { hashPassword, verifyPassword } from "../util/password";

const userRouter = Router();

const searchParams = z.object({
  universityId: z.number().int(),
  name: z.string().optional(),
  email: z.string().email().optional(),
});

userRouter.get("/", async (req, res) => {
  try {
    const params = searchParams.parse(req.query);

    const users = await prisma.user.findMany({
      where: {
        name: { contains: params.name },
        email: params.email,
        universityId: params.universityId,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      res.sendStatus(500);
    }
  }
});

const createInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  universityId: z.number().int(),
});

userRouter.post("/", async (req, res) => {
  try {
    const input = createInput.parse(req.body);

    const university = await prisma.university.findUnique({
      where: { id: input.universityId },
    });
    if (!university) {
      res.sendStatus(404);
      return;
    }

    const hashedPassword = await hashPassword(input.password);
    const data = { ...input, password: hashedPassword };
    const user = await prisma.user.create({ data });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      res.sendStatus(500);
    }
  }
});

const updateInput = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
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
    const updatedUser = await prisma.user.update({ where: { id }, data });

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
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
    res.sendStatus(500);
  }
});

export default userRouter;
