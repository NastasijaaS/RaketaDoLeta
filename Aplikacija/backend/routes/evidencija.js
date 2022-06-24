import express from "express";
const router = express.Router();
import { izmeniEvidenciju, vidiEvidenciju } from "../controllers/evidencija.js";
import {auth} from "../auth.js";


router.put('/izmeniEvidenciju/:idTrenera/:idTreninga',auth, izmeniEvidenciju);
router.get('/vidiEvidenciju/:idTrenera/:idKorisnika', auth, vidiEvidenciju);


export default router;