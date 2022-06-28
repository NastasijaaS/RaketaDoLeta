import express from "express";
const router = express.Router();
import { vratiBlogove, vratiBlogTag, izmeniBlog, obrisiBlog, dodajBlog } from "../controllers/blog.js";
import { auth } from "../auth.js";


router.get('/vratiBlogove', vratiBlogove); //ovo ne korisnimo
router.get('/vratiBlogTag/:tag', vratiBlogTag);
router.put('/izmeniBlog/:idBloga', auth, izmeniBlog); // isto
router.delete('/obrisiBlog/:idBloga', auth, obrisiBlog); // isto
router.post('/dodajBlog', auth, dodajBlog); // isto

export default router;
