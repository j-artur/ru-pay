import { Router } from "express";
import employeeRouter from "./employee";
import mealRouter from "./meal";
import paymentRouter from "./payment";
import universityRouter from "./university";
import userRouter from "./user";

const appRouter = Router();

appRouter.use("/employee", employeeRouter);
appRouter.use("/meal", mealRouter);
appRouter.use("/university", universityRouter);
appRouter.use("/user", userRouter);
appRouter.use("/payment", paymentRouter);

export default appRouter;
