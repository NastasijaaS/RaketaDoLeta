import express from "express";
const router = express.Router();
import { vidiNapredakKorisnik, vidiNapredakPoslednji,dodajNapredak,izmeniNapredak,vidiNapredak } from "../controllers/napredak.js";
import {auth} from "../auth.js";

router.get('/vidiNapredakKorisnik/:idKorisnika',auth, vidiNapredakKorisnik);
router.get('/vidiNapredakPoslednji/:idKorisnika',auth, vidiNapredakPoslednji);
router.post('/dodajNapredak/:idTrenera/:idKorisnika',auth, dodajNapredak);
router.put('/izmeniNapredak/:idNapredak',auth, izmeniNapredak);
router.get('/vidiNapredak/:idTrenera/:idKorisnika',auth, vidiNapredak);


export default router;