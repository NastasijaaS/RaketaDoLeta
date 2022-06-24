
import express from "express";
const router = express.Router();
import { dodajUslugu, izmeniUslugu,obrisiUslugu,vidiUsluge } from "../controllers/usluga.js";
import {auth} from "../auth.js";

router.post('/dodajUslugu',auth, dodajUslugu);
router.put('/izmeniUslugu/:idUsluge',auth, izmeniUslugu);
router.delete('/obrisiUslugu/:idUsluge',auth, obrisiUslugu);
router.get('/vidiUsluge', vidiUsluge);


export default router;