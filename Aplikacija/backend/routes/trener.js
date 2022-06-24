
import express from "express";
const router = express.Router();

import { dodajTrenera, obrisiTrenera,dodajSliku,vidiTrenerePersonalni,vidiTrenereSvi,vidiTrenereGrupni,dodajOpis } from "../controllers/trener.js";
import {auth} from "../auth.js";

router.post('/dodajTrenera/:id',auth, dodajTrenera);
router.delete('/obrisiTrenera/:idTrenera',auth, obrisiTrenera);
router.put('/dodajSliku/:idTrenera',auth, dodajSliku);
router.put('/dodajOpis/:idTrenera',auth, dodajOpis);
router.get('/vidiTrenereGrupni', vidiTrenereGrupni);
router.get('/vidiTrenerePersonalni', vidiTrenerePersonalni);
router.get('/vidiTrenereSvi', vidiTrenereSvi);


export default router;




