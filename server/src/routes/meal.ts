import { Router } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { idParam } from "../util";
import { authenticateEmployee } from "../util/auth";

const mealRouter = Router();

const searchParams = z.object({
  type: z.number().int().optional(),
  date: z.string().optional(),
});

mealRouter.get("/", async (req, res) => {
  try {
    const params = searchParams.parse(req.query);

    const meals = await prisma.meal.findMany({
      where: {
        type: { id: params.type },
        date: params.date,
      },
    });

    res.status(200).json(meals);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

mealRouter.get("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);

    const meal = await prisma.meal.findUnique({ where: { id } });

    if (meal) {
      res.status(200).json(meal);
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
  type: z.number().int(),
  description: z.string(),
  date: z.string(),
});

mealRouter.post("/", authenticateEmployee, async (req, res) => {
  try {
    const data = createInput.parse(req.body);

    const meal = await prisma.meal.create({
      data: {
        type: { connect: { id: data.type } },
        description: data.description,
        date: data.date,
      },
    });

    res.status(201).json(meal);
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
  description: z.string().optional(),
  date: z.string().optional(),
});

mealRouter.put("/:id", authenticateEmployee, async (req, res) => {
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
      console.log(error);
      res.sendStatus(500);
    }
  }
});

mealRouter.delete("/:id", authenticateEmployee, async (req, res) => {
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
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

export default mealRouter;
