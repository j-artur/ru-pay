import { PaymentStatus } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { idParam } from "../util";
import {
  authenticate,
  authenticateEmployee,
  authenticateUser,
} from "../util/auth";

const paymentRouter = Router();

const searchParams = z.object({
  userId: z.number().int().optional(),
  mealTypeId: z.number().int().optional(),
});

paymentRouter.get("/", authenticate, async (req, res) => {
  try {
    const params = searchParams.parse(req.query);

    const payments = await prisma.payment.findMany({
      where: {
        userId: params.userId,
        mealTypeId: params.mealTypeId,
      },
      include: {
        user: true,
        mealType: true,
      },
    });

    res.status(200).json(payments);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

paymentRouter.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        user: true,
        mealType: true,
      },
    });

    if (payment) {
      res.status(200).json(payment);
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
  userId: z.number().int(),
  mealTypeId: z.number().int(),
});

paymentRouter.post("/", authenticateUser, async (req, res) => {
  try {
    const input = createInput.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { id: input.userId },
    });
    if (!user) {
      console.log("User not found");
      res.sendStatus(404);
      return;
    }

    const mealType = await prisma.mealType.findUnique({
      where: { id: input.mealTypeId },
    });
    if (!mealType) {
      console.log("Meal type not found");
      res.sendStatus(404);
      return;
    }

    const payment = await prisma.payment.create({ data: input });

    res.status(201).json(payment);
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
  status: z
    .string()
    .optional()
    .refine(v => Object.keys(PaymentStatus).includes(v!), "Invalid status")
    .transform(v => v as PaymentStatus),
});

paymentRouter.patch("/:id", authenticateEmployee, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);
    const input = updateInput.parse(req.body);

    const payment = await prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      res.sendStatus(404);
      return;
    }
    if (payment.status === "Redeemed" || input.status !== "Redeemed") {
      res.sendStatus(403);
      return;
    }

    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: input,
    });

    res.status(200).json(updatedPayment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

export default paymentRouter;
