
import express from "express";
const router = express.Router();
import { upravaUpdate, dodajUpravu,obrisiUpravu } from "../controllers/uprava.js";
import {auth} from "../auth.js";

router.put('/upravaUpdate/:id', auth,upravaUpdate);
router.post('/dodajUpravu/:id',auth, dodajUpravu);
router.delete('/obrisiUpravu/:idUprave', auth,obrisiUpravu);



export default router;