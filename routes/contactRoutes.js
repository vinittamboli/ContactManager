import { Router } from "express";
import {getContacts, postContact, getContact, updateContact, deleteContact} from "../controllers/contactController.js"
import validateToken from "../middleware/validateToken.js";

const contactRouter = Router();

contactRouter.use(validateToken)

contactRouter.route("/").get(getContacts).post(postContact)

contactRouter.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

export default contactRouter;


