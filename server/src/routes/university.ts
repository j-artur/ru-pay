// import { Router } from "express";
// import { z } from "zod";
// import prisma from "../prisma";
// import { idParam } from "../util";

// const universityRouter = Router();

// const searchParams = z.object({
//   name: z.string().optional(),
// });

// universityRouter.get("/", async (req, res) => {
//   try {
//     const params = searchParams.parse(req.query);

//     const universities = await prisma.university.findMany({
//       where: {
//         name: { contains: params.name },
//       },
//     });

//     res.status(200).json(universities);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       res.status(400).json(error);
//     } else {
//       console.log(error);
//       res.sendStatus(500);
//     }
//   }
// });

// universityRouter.get("/:id", async (req, res) => {
//   try {
//     const { id } = idParam.parse(req.params);

//     const university = await prisma.university.findUnique({
//       where: { id },
//     });

//     if (university) {
//       res.status(200).json(university);
//     } else {
//       res.sendStatus(404);
//     }
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       res.status(400).json(error);
//     } else {
//       console.log(error);
//       res.sendStatus(500);
//     }
//   }
// });

// const createInput = z.object({
//   name: z.string(),
//   profilePicture: z.string().url().optional(),
//   pixKey: z.string(),
// });

// universityRouter.post("/", async (req, res) => {
//   try {
//     const input = createInput.parse(req.body);

//     const university = await prisma.university.create({ data: input });

//     res.status(201).json(university);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       res.status(400).json(error);
//     } else {
//       console.log(error);
//       res.sendStatus(500);
//     }
//   }
// });

// const updateInput = z.object({
//   name: z.string().optional(),
//   profilePicture: z.string().url().optional(),
//   pixKey: z.string().optional(),
// });

// universityRouter.put("/:id", async (req, res) => {
//   try {
//     const { id } = idParam.parse(req.params);
//     const input = updateInput.parse(req.body);

//     const university = await prisma.university.findUnique({
//       where: { id },
//     });
//     if (!university) {
//       res.sendStatus(404);
//       return;
//     }

//     const updatedUniversity = await prisma.university.update({
//       where: { id },
//       data: input,
//     });

//     res.status(200).json(updatedUniversity);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       res.status(400).json(error);
//     } else {
//       console.log(error);
//       res.sendStatus(500);
//     }
//   }
// });

// universityRouter.delete("/:id", async (req, res) => {
//   try {
//     const { id } = idParam.parse(req.params);

//     const university = await prisma.university.delete({ where: { id } });
//     if (!university) {
//       res.sendStatus(404);
//       return;
//     }

//     await prisma.university.delete({ where: { id } });

//     res.sendStatus(204);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       res.status(400).json(error);
//     } else {
//       console.log(error);
//       res.sendStatus(500);
//     }
//   }
// });

// export default universityRouter;
