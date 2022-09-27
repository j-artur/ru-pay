import { Router } from "express";
import employeeRouter from "./employee";
import mealRouter from "./meal";
import paymentRouter from "./payment";
// import universityRouter from "./university";
import userRouter from "./user";

const appRouter = Router();

appRouter.use("/employees", employeeRouter);
appRouter.use("/meals", mealRouter);
// appRouter.use("/university", universityRouter);
appRouter.use("/users", userRouter);
appRouter.use("/payments", paymentRouter);

export default appRouter;
