const express = require ('express');
const router = express.Router();
const path = require ('path');
const productsController = require("../controllers/productsController.js");

//Se requiere multer para cargar imagenes
const multer = require ('multer');
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../public/images"),
    filename: (req, file, cb) => {
        cb(null, "image-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
});

/* Rutas de productosgenerales*/
router.get("/",productsController.home);
router.get("/create",productsController.create)//Solo vista de creacion
router.post("/create", upload.single("imageProduct"), productsController.store);//No olvidar poner upload para que multer almacene imagen
router.get("/:id",productsController.edit);
router.put("/:id",upload.single("imageEditProduct"), productsController.update);//Edición de producto
router.delete("/:id",productsController.destroy);

module.exports=router;