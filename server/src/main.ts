import express from "express";
import prisma from "./prisma";
import appRouter from "./routes";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(appRouter);

prisma
  .$connect()
  .then(async () => {
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch(error => {
    console.log("Error connecting to database");
    console.error(error);
  });
