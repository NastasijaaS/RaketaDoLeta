import express from "express";
const router = express.Router();
import { vidiClanarinu, dodajClanarinu } from "../controllers/clanarina.js";
import {auth} from "../auth.js";


router.get('/vidiClanarinu/:idKorisnika', auth, vidiClanarinu);
router.put('/dodajClanarinu/:idKorisnika/:idUsluge',auth, dodajClanarinu);



export default router;