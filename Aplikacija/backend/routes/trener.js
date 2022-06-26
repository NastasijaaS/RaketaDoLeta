
import express from "express";
const router = express.Router();

import { dodajTrenera, obrisiTrenera,dodajSliku,vidiTrenerePersonalni,vidiTrenereSvi,vidiTrenereGrupni,dodajOpis } from "../controllers/trener.js";
import {auth,upravaMethod} from "../auth.js";

router.post('/dodajTrenera/:id',auth,upravaMethod, dodajTrenera);
router.delete('/obrisiTrenera/:idTrenera',auth,upravaMethod, obrisiTrenera);
router.put('/dodajSliku/:idTrenera',auth, dodajSliku);
router.put('/dodajOpis/:idTrenera',auth, dodajOpis);
router.get('/vidiTrenereGrupni', vidiTrenereGrupni);
router.get('/vidiTrenerePersonalni', vidiTrenerePersonalni);
router.get('/vidiTrenereSvi', vidiTrenereSvi);


export default router;




