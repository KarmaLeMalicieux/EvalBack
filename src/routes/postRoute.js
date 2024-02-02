import { Router } from "express";
import { addPost } from "../controller/postController";
import { auth } from "../middleware/auth";



const postRouter = Router()

// http://localhost:1234/comm/:subId/post/:userId
postRouter.post("/:subId/post/:userId",auth, addPost)

export default postRouter