import { Router } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { idParam } from "../util";
import { authenticateEmployee } from "../util/auth";

const mealTypeRouter = Router();

const searchParams = z.object({
  name: z.string().optional(),
  price: z.number().int().optional(),
});

mealTypeRouter.get("/", async (req, res) => {
  try {
    const params = searchParams.parse(req.query);

    const mealTypes = await prisma.mealType.findMany({
      where: {
        name: { contains: params.name },
        price: params.price,
      },
    });

    res.status(200).json(mealTypes);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

mealTypeRouter.get("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);

    const mealType = await prisma.mealType.findUnique({ where: { id } });

    if (mealType) {
      res.status(200).json(mealType);
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
  price: z.number().int(),
});

mealTypeRouter.post("/", authenticateEmployee, async (req, res) => {
  try {
    const data = createInput.parse(req.body);

    const mealType = await prisma.mealType.create({ data });

    res.status(201).json(mealType);
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
  price: z.number().int().optional(),
});

mealTypeRouter.put("/:id", authenticateEmployee, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);
    const data = updateInput.parse(req.body);

    const mealType = await prisma.mealType.findUnique({ where: { id } });
    if (!mealType) {
      res.sendStatus(404);
      return;
    }

    const updatedMealType = await prisma.mealType.update({
      where: { id },
      data,
    });

    res.status(200).json(updatedMealType);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

mealTypeRouter.delete("/:id", authenticateEmployee, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);

    const mealType = await prisma.mealType.findUnique({ where: { id } });
    if (!mealType) {
      res.sendStatus(404);
      return;
    }

    await prisma.mealType.delete({ where: { id } });

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

export default mealTypeRouter;
