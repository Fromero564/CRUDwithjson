const express = require ('express');
const bodyParser = require('body-parser')
const app = express ();
const path = require ('path');
const methodOverride = require("method-override");
const { Router } = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./routers/mainRouter');


// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Parse application/json
app.use(bodyParser.json())
app.use(methodOverride("_method")); 

/*Carpeta public*/
app.use(express.static(path.join(__dirname,'public')));

/*Declaracion de puerto*/ 
var PORT = 3001;

app.listen(PORT,() => {

console.log(`Se prendio el servidor en ${PORT}`);

});

/*EJS ENGINE*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/*Vistas renderizadas*/
app.use('/',router)