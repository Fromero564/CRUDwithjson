const path = require("path");
const { saveProduct, findById } = require("../data/products");
const fs = require("fs");
const productosFilePath = path.resolve('data/productsDatos.json')


module.exports={
 home:(req,res)=>{
   const productsFileContent = fs.readFileSync(productosFilePath, "utf-8"); //Lee el archivo JSON.
   const products = JSON.parse(productsFileContent); //Se convierte a un objeto.
   res.render('index', { products}); //Se pasa variable de los productos en products.
 },
 create:(req,res)=>{
    res.render('create') //vista para ver la secicon de create.
  },
destroy: (req, res) => {
   let id = req.params.id;
   let jsonData = fs.readFileSync(productosFilePath);
   let data = JSON.parse(jsonData);
   let removed = data.filter(p => p.id != id);
  fs.writeFileSync(productosFilePath,(JSON.stringify (removed)));
   
  res.redirect('/');
    
    
  },
 edit: (req, res) => {
  const productsFileContent = fs.readFileSync(productosFilePath, "utf-8");
  const products = JSON.parse(productsFileContent);
  const id = req.params.id;
  const product = products.find((p)=> p.id == id);
    res.render("edit", { product });
  },
 store: (req, res) => {
    const product = {
        id: Date.now(), //Genera un ID a partir de la fecha 
        name: req.body.nameProduct,
        colour: req.body.colourProduct,
        description: req.body.descriptionProduct,
        price: Number(req.body.priceProduct),//Number porque traigo un string y debo convertirlo a un numero
        image: req.file ? req.file.filename : "default-image.png",//imagen, si no se carga imagen se coloca el default-image.png
    };
   
    let productsFileContent = fs.readFileSync(productosFilePath, "utf-8"); //Lee el archivo JSON.
    let products = JSON.parse(productsFileContent); //Se convierte a un objeto.
    products.push(product);//Pusheo el objeto guardado en product.
    productsFileContent = JSON.stringify(products, null, 4);//Devuelvo a JSON
    fs.writeFileSync(productosFilePath, productsFileContent, "utf-8"); //Tomo los datos viejos junto con el dato nuevo que pusheo y lo escribo en el archivo
res.redirect('/')//Redirecciono a inicio

},
 update: (req, res) => {
   let id = req.params.id;
  

   let jsonData = fs.readFileSync(productosFilePath);
   let data = JSON.parse(jsonData);
   const dataFind = data.find(obj => obj.id == id)
  
  
   dataFind.name = req.body.nameEditProduct;
   dataFind.colour = req.body.colourEditProduct;
   dataFind.description = req.body.descriptionEditProduct;
   dataFind.price = Number(req.body.priceEditProduct);
   dataFind.image = req.file ? req.file.filename : dataFind.image;

  
  fs.writeFileSync(productosFilePath,(JSON.stringify (data)));
  
  res.redirect('/');

},
}