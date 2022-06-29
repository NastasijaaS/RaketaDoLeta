import express from "express";
const router = express.Router();
import { register, login, proveriSifru,proveriEmail,refresh,vratiKorisnikaPrekoTokena} from "../controllers/auth.js";
import {refreshAuth} from "../auth.js";


import multer from "multer";
export const upload = multer({});


router.post('/register', register);
router.post('/login', login);
router.post('/proveriSifru', proveriSifru);
router.post('/proveriEmail', proveriEmail);
router.post('/refresh', refreshAuth,refresh);
router.get('/vratiKorisnikaPrekoTokena', vratiKorisnikaPrekoTokena);

export default router;
