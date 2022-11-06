import { Router } from "express";
import employeeAuthRouter from "./auth/employee";
import userAuthRouter from "./auth/user";
import employeeRouter from "./employee";
import mealRouter from "./meal";
import mealTypeRouter from "./meal_type";
import paymentRouter from "./payment";
import userRouter from "./user";

const appRouter = Router();

appRouter.use((req, _, next) => {
  console.log("Time: ", new Date().toLocaleString());
  console.log({
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers,
  });

  next();
});

appRouter.use("/employees", employeeRouter);
appRouter.use("/meals", mealRouter);
appRouter.use("/meal_types", mealTypeRouter);
appRouter.use("/users", userRouter);
appRouter.use("/payments", paymentRouter);
appRouter.use("/user_auth", userAuthRouter);
appRouter.use("/employee_auth", employeeAuthRouter);

export default appRouter;
