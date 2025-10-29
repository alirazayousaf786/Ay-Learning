import express from "express"
import {Contact , getAllContact,getIdDelete} from "../controllers/ContactControl.js"

const router = express.Router();


router.post("/contact",Contact);
router.get("/contact", getAllContact)
router.delete("/contact/:id", getIdDelete)
export default router;