import express from "express";
import { validateExtract } from "../middlewares/extract.middleware.js";
import { updateExpenses } from "../controllers/extract.controller.js";
import { getUserExtract } from "../controllers/userExtract.controller.js";

const extractRouter = express.Router();

extractRouter.post("/extract", validateExtract, updateExpenses);

extractRouter.get("/extract", getUserExtract);

export default extractRouter;
