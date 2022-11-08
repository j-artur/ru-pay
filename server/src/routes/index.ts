import { Router } from "express";
import employeeAuthRouter from "./auth/employee";
import userAuthRouter from "./auth/user";
import employeeRouter from "./employee";
import mealRouter from "./meal";
import mealTypeRouter from "./meal_type";
import paymentRouter from "./payment";
import userRouter from "./user";

const appRouter = Router();

appRouter.use("/employees", employeeRouter);
appRouter.use("/meals", mealRouter);
appRouter.use("/meal_types", mealTypeRouter);
appRouter.use("/users", userRouter);
appRouter.use("/payments", paymentRouter);
appRouter.use("/user_auth", userAuthRouter);
appRouter.use("/employee_auth", employeeAuthRouter);

export default appRouter;
