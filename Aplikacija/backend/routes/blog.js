import express from "express";
const router = express.Router();
import { vratiBlogove, vratiBlogTag,izmeniBlog,obrisiBlog,dodajBlog } from "../controllers/blog.js";
import {auth} from "../auth.js";


router.get('/vratiBlogove', vratiBlogove);
router.get('/vratiBlogTad/:tag', vratiBlogTag);
router.put('/izmeniBlog/:idBloga', auth, izmeniBlog);
router.delete('/obrisiBlog/:idBloga', auth, obrisiBlog);
router.post('/dodajBlog', auth, dodajBlog);

export default router;
