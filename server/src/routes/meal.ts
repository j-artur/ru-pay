import { Router } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { idParam } from "../util";

const mealRouter = Router();

const searchParams = z.object({
  universityId: z.number().int(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().int().optional(),
});

mealRouter.get("/", async (req, res) => {
  try {
    const params = searchParams.parse(req.query);

    const meals = await prisma.meal.findMany({
      where: {
        name: { contains: params.name },
        description: { contains: params.description },
        price: params.price,
        universityId: params.universityId,
      },
    });

    res.status(200).json(meals);
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
  description: z.string(),
  price: z.number().int(),
  universityId: z.number().int(),
});

mealRouter.post("/", async (req, res) => {
  try {
    const data = createInput.parse(req.body);

    const university = await prisma.university.findUnique({
      where: { id: data.universityId },
    });
    if (!university) {
      res.sendStatus(404);
      return;
    }

    const meal = await prisma.meal.create({ data });

    res.status(201).json(meal);
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
  description: z.string().optional(),
  price: z.number().int().optional(),
});

mealRouter.put("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);
    const data = updateInput.parse(req.body);

    const meal = await prisma.meal.findUnique({ where: { id } });
    if (!meal) {
      res.sendStatus(404);
      return;
    }

    const updatedMeal = await prisma.meal.update({
      where: { id },
      data,
    });

    res.status(200).json(updatedMeal);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      res.sendStatus(500);
    }
  }
});

mealRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);

    const meal = await prisma.meal.findUnique({ where: { id } });
    if (!meal) {
      res.sendStatus(404);
      return;
    }

    await prisma.meal.delete({ where: { id } });

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default mealRouter;
