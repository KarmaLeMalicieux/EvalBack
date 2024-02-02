import { Router } from "express";
import { addSub, allSubs, deleteSub, showSub } from "../controller/subredditsController";
import { auth } from "../middleware/auth";



const subRouter = Router()


// http://localhost:1234/sub/all
subRouter.get("/all", allSubs);

// http://localhost:1234/sub/:id
subRouter.get("/:id", showSub);

// http://localhost:1234/sub/:id/delete
subRouter.delete("/:id/delete",auth, deleteSub);

// http://localhost:1234/sub/newSub
subRouter.post("/newSub",auth, addSub);

export default subRouter