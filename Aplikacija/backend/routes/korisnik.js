
import express from "express";
const router = express.Router();
import { izmeniParametre, dodajKorisnika,izmeniKorisnika,obrisiSvogKlijenta,vratiKorisnike,obrisiKorisnika,verifikujNalog,vratiVerifikovaneNaloge,vratiNeverifikovaneNaloge } from "../controllers/korisnik.js";
import {auth} from "../auth.js";

router.put('/izmeniParametre/:idKorisnika',auth, izmeniParametre);
router.post('/dodajKorisnika/:id/:korid',auth, dodajKorisnika);
router.put('/izmeniKorisnika/:id', izmeniKorisnika);
router.put('/obrisiSvogKlijenta/:id',auth, obrisiSvogKlijenta);
router.get('/vratiKorisnike/:id',auth, vratiKorisnike);
router.delete('/obrisiKorisnika/:id',auth, obrisiKorisnika);
router.put('/verifikujNalog/:idKorisnika',auth, verifikujNalog);
router.get('/vratiVerifikovaneNaloge',auth, vratiVerifikovaneNaloge);
router.get('/vratiNeverifikovaneNaloge',auth, vratiNeverifikovaneNaloge);


export default router;