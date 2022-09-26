import { Router } from "express";
import { z } from "zod";
import prisma from "../prisma";
import { idParam } from "../util";
import { hashPassword, verifyPassword } from "../util/password";

const employeeRouter = Router();

const searchParams = z.object({
  universityId: z.number().int(),
  name: z.string().optional(),
  email: z.string().email().optional(),
});

employeeRouter.get("/", async (req, res) => {
  try {
    const params = searchParams.parse(req.query);

    const employees = await prisma.employee.findMany({
      where: {
        name: { contains: params.name },
        email: params.email,
        universityId: params.universityId,
      },
    });

    res.status(200).json(employees);
  } catch (error) {
    res.sendStatus(500);
  }
});

employeeRouter.get("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params.id);

    const employee = await prisma.employee.findUnique({ where: { id } });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.sendStatus(404);
    }
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

employeeRouter.post("/", async (req, res) => {
  try {
    const input = createInput.parse(req.body);

    const university = await prisma.university.findUnique({
      where: { id: input.universityId },
    });
    if (!university) {
      res.sendStatus(404);
      return;
    }

    const employee = await prisma.employee.create({ data: input });

    res.status(201).json(employee);
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

employeeRouter.put("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);
    const input = updateInput.parse(req.body);

    const employee = await prisma.employee.findUnique({ where: { id } });
    if (!employee) {
      res.sendStatus(404);
      return;
    }

    const isPasswordValid = await verifyPassword(
      input.currentPassword,
      employee.password,
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
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data,
    });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error);
    }
  }
});

employeeRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = idParam.parse(req.params);

    const employee = await prisma.employee.findUnique({ where: { id } });
    if (!employee) {
      res.sendStatus(404);
      return;
    }

    await prisma.employee.delete({ where: { id } });

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default employeeRouter;
