//const express = require("express");
//const Router = express.Router();
import { Router } from "express";
import {getUsers,registerUser,login,currentUser,deleteUser} from "../controllers/userController.js"
import validateToken from "../middleware/validateToken.js"


const router = Router();

router.get("/",getUsers)
 router.route("/:id").delete(deleteUser)

router.post("/register/",registerUser);
router.get("/currentuser",validateToken,currentUser);
router.post("/login",login);

export default router;
