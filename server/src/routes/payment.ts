import { PaymentStatus } from "@prisma/client";
import { Router } from "express";
import { unlink } from "fs/promises";
import path from "path";
import { z } from "zod";
import { uploadReceipt } from "../multer";
import prisma from "../prisma";
import { idParam } from "../util";

const paymentRouter = Router();

const searchParams = z
  .object({
    // universityId: z.number().int(),
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
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
        // meal: { universityId: params.universityId },
        date: { gte: params.fromDate, lte: params.toDate },
        userId: params.userId,
        mealId: params.mealId,
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

paymentRouter.get("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);

    const payment = await prisma.payment.findUnique({ where: { id } });

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
  date: z.string(),
  receipt: z.any(),
  userId: z.string().transform(Number),
  mealId: z.string().transform(Number),
});

paymentRouter.post("/", uploadReceipt.single("receipt"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No receipt file provided" });
    return;
  }
  try {
    const input = createInput.parse(req.body);

    console.log(req.file.path);

    // const university = await prisma.university.findUnique({
    //   where: { id: input.universityId },
    // });
    // if (!university) {
    //   await unlink(req.file.path);
    //   res.sendStatus(404);
    //   return;
    // }

    const user = await prisma.user.findUnique({
      where: { id: input.userId },
    });
    if (!user) {
      console.log("User not found");
      await unlink(req.file.path);
      res.sendStatus(404);
      return;
    }

    const meal = await prisma.meal.findUnique({
      where: { id: input.mealId },
    });
    if (!meal) {
      console.log("Meal not found");
      await unlink(req.file.path);
      res.sendStatus(404);
      return;
    }

    // if (meal.universityId !== user.universityId) {
    //   await unlink(req.file.path);
    //   res.sendStatus(403);
    //   return;
    // }

    const data = {
      ...input,
      receipt: undefined,
      receiptUrl: req.file.filename,
    };
    const payment = await prisma.payment.create({ data });

    res.status(201).json(payment);
  } catch (error) {
    await unlink(req.file.path);
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

paymentRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);
    const input = updateInput.parse(req.body);

    const payment = await prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      res.sendStatus(404);
      return;
    }
    if (
      payment.status === "Redeemed" ||
      payment.status === "Rejected" ||
      payment.status === "Cancelled"
    ) {
      res.sendStatus(403);
      return;
    }
    if (
      payment.status === "Pending" &&
      input.status !== "Approved" &&
      input.status !== "Rejected" &&
      input.status !== "Cancelled"
    ) {
      res.sendStatus(403);
      return;
    }
    if (payment.status === "Approved" && input.status !== "Redeemed") {
      res.sendStatus(403);
      return;
    }

    if (payment.receiptUrl != null) {
      await unlink(
        path.resolve(__dirname, "..", "..", "uploads", payment.receiptUrl),
      );
    }

    const data = { ...input, receiptUrl: null };

    const updatedPayment = await prisma.payment.update({ where: { id }, data });

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

paymentRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);

    const payment = await prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      res.sendStatus(404);
      return;
    }

    await prisma.payment.delete({ where: { id } });

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

export default paymentRouter;
