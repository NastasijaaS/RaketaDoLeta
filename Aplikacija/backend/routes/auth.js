import express from "express";
const router = express.Router();
import { register, login, proveriSifru,proveriEmail } from "../controllers/auth.js";
import {refreshAuth} from "../auth.js";

router.post('/register', register);
router.post('/login', login);
router.post('/proveriSifru', proveriSifru);
router.get('/proveriEmail', proveriEmail);
router.get('/refresh', refreshAuth);

export default router;
