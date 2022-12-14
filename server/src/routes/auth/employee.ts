import { Router } from "express";
import { z } from "zod";
import prisma from "../../prisma";
import {
  authenticateEmployee,
  EmployeeJWT,
  signEmployeeJWT,
} from "../../util/auth";
import { verifyPassword } from "../../util/password";

const employeeAuthRouter = Router();

const loginInput = z.object({
  email: z.string(),
  password: z.string(),
});

employeeAuthRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = loginInput.parse(req.body);

    const employee = await prisma.employee.findFirst({
      where: { email },
    });

    if (!employee) {
      res.sendStatus(401);
    } else if (!(await verifyPassword(password, employee.password))) {
      res.sendStatus(401);
    } else {
      const token = signEmployeeJWT(employee);
      res.status(200).json({ token });
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

employeeAuthRouter.get("/me", authenticateEmployee, async (_, res) => {
  try {
    const employee = res.locals["employee"] as EmployeeJWT;

    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default employeeAuthRouter;
