import express from "express";
const router = express.Router();
import { vratiBlogove, vratiBlogTag, izmeniBlog, obrisiBlog, dodajBlog } from "../controllers/blog.js";
import { auth } from "../auth.js";
import multer from "multer";


router.get('/vratiBlogove', vratiBlogove); //ovo ne korisnimo
router.get('/vratiBlogTag/:tag', vratiBlogTag);
router.put('/izmeniBlog/:idBloga', auth, izmeniBlog); // isto
router.delete('/obrisiBlog/:idBloga', auth, obrisiBlog); // isto
router.post('/dodajBlog', auth, dodajBlog);


const upload = multer({
    dest: "/path/to/temporary/directory/to/store/uploaded/files"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });
  
  
  router.post(
    "/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
      const tempPath = req.file.path;
      const targetPath = path.join(__dirname, "./uploads/image.png");
  
      if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
  
          res
            .status(200)
            .contentType("text/plain")
            .end("File uploaded!");
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
  
          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        });
      }
    }
  );
export default router;
