import express from "express";
import prisma from "./prisma";
import appRouter from "./routes";
import { pixKey } from "./util/consts";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(appRouter);

prisma
  .$connect()
  .then(async () => {
    console.log(pixKey);

    app.listen(3030, () => {
      console.log("Server started on port 3030");
    });
  })
  .catch(error => {
    console.log("Error connecting to database");
    console.error(error);
  });
