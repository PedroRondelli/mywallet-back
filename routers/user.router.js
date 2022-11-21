import express from "express";
import { validateRegister } from "../middlewares/register.middleware.js";
import { registerUser } from "../controllers/signup.controller.js";
import { validateLogin } from "../middlewares/login.middleware.js";
import { logIn } from "../controllers/login.controller.js";
import { deleteSession } from "../controllers/deleteSession.controller.js";

const userRouter = express.Router();

userRouter.post("/signUp", validateRegister, registerUser);

userRouter.post("/signIn", validateLogin, logIn);

userRouter.delete("/session", deleteSession);

export default userRouter;
