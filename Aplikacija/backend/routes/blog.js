import express from "express";
const router = express.Router();
import { vratiBlogove, vratiBlogTag, izmeniBlog, obrisiBlog, dodajBlog, slika } from "../controllers/blog.js";
import { auth } from "../auth.js";
import multer from "multer";

const upload = multer({});

router.get('/vratiBlogove', vratiBlogove); //ovo ne korisnimo
router.get('/vratiBlogTag/:tag', vratiBlogTag);
router.put('/izmeniBlog/:idBloga', auth, izmeniBlog); // isto
router.delete('/obrisiBlog/:idBloga', auth, obrisiBlog); // isto
router.post('/dodajBlog', auth, upload.single('file'), dodajBlog);



// router.post("/upload", upload.single('file'), slika);


export default router;
