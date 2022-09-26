import { Router } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { idParam } from "../util";

const paymentRouter = Router();

const searchParams = z
  .object({
    universityId: z.number().int(),
    amount: z.number().int().optional(),
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
    receipt: z.string().optional(),
    userId: z.number().int().optional(),
    mealId: z.number().int().optional(),
  })
  .refine(data => {
    if (!data.fromDate && !data.toDate) {
      return true;
    }
    if (data.fromDate && data.toDate) {
      return new Date(data.fromDate) < new Date(data.toDate);
    }
    return false;
  }, "Both fromDate and toDate must be provided or neither, and fromDate must be before toDate");

paymentRouter.get("/", async (req, res) => {
  try {
    const params = searchParams.parse(req.query);

    const payments = await prisma.payment.findMany({
      where: {
        meal: { universityId: params.universityId },
        amount: params.amount,
        date: { gte: params.fromDate, lte: params.toDate },
        receipt: params.receipt,
        userId: params.userId,
        mealId: params.mealId,
      },
    });

    res.status(200).json(payments);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      res.sendStatus(500);
    }
  }
});

paymentRouter.get("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params.id);

    const payment = await prisma.payment.findUnique({ where: { id } });

    if (payment) {
      res.status(200).json(payment);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

const createInput = z.object({
  universityId: z.number().int(),
  amount: z.number().int(),
  date: z.string(),
  receipt: z.string(),
  userId: z.number().int(),
  mealId: z.number().int(),
});

paymentRouter.post("/", async (req, res) => {
  try {
    const input = createInput.parse(req.body);

    const university = await prisma.university.findUnique({
      where: { id: input.universityId },
    });
    if (!university) {
      res.sendStatus(404);
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: input.userId },
    });
    if (!user || user.universityId !== input.universityId) {
      res.sendStatus(404);
      return;
    }

    const meal = await prisma.meal.findUnique({
      where: { id: input.mealId },
    });
    if (!meal || meal.universityId !== input.universityId) {
      res.sendStatus(404);
      return;
    }

    const data = { ...input, universityId: undefined };
    const payment = await prisma.payment.create({ data });

    res.status(201).json(payment);
  } catch (error) {
    res.sendStatus(500);
  }
});

paymentRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params.id);

    const payment = await prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      res.sendStatus(404);
      return;
    }

    await prisma.payment.delete({ where: { id } });

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default paymentRouter;
