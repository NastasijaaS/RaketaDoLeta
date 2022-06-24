import express from "express";
const router = express.Router();
import { vratiTermineZaTrenera, dodajTerminTreneru,zakaziTermin,obrisiTermin,vratiSlobodneTermineZaTreneraPoDatumu,vratiZauzeteTermineZaTreneraPoDatumu } from "../controllers/termin.js";
import {auth} from "../auth.js";



router.get('/vratiTermineZaTrenera/:idTrenera',auth, vratiTermineZaTrenera);
router.post('/dodajTerminTreneru/:idTrenera',auth, dodajTerminTreneru);
router.put('/zakaziTermin/:idTermina',auth, zakaziTermin);
router.delete('/obrisiTermin/:idTermina',auth, obrisiTermin);
router.get('/vratiSlobodneTermineZaTreneraPoDatumu/:idTrenera/:datum',auth, vratiSlobodneTermineZaTreneraPoDatumu);
router.get('/vratiZauzeteTermineZaTreneraPoDatumu/:idTrenera/:datum',auth, vratiZauzeteTermineZaTreneraPoDatumu);

export default router;