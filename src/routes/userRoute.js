import { Router } from "express";
import { login, signUp } from "../controller/userController";

const userRouter = Router();

// http://localhost:1234/user/register
userRouter.post("/register", signUp);

// http://localhost:1234/user/login
userRouter.post("/login", login);

export default userRouter;
