import express from "express";
const router = express.Router();

import { obrisiZahtev,vidiZahteve,vidiZahteveZaKorisnika,napraviZahtev,vratiZahteveOdbijeni } from "../controllers/zahtev.js";
import {auth} from "../auth.js";


router.delete('/obrisiZahtev/:idZahteva',auth, obrisiZahtev);
router.get('/vidiZahteve/:idRegKorisnika/:status',auth, vidiZahteve);
router.get('/vidiZahteveZaKorisnika/:idRegKorisnika',auth, vidiZahteveZaKorisnika);
router.post('/napraviZahtev/:idTreninga',auth, napraviZahtev);
router.get('/vratiZahteveOdbijeni',auth, vratiZahteveOdbijeni);


export default router;