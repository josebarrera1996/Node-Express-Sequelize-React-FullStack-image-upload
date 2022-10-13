
// Importando las librerías, módulos, etc

const express = require('express'); // importando 'express' 
const cors = require('cors'); // importando 'cors'
const bodyParser = require('body-parser'); // Importando 'body-parser'

const app = express(); // instanciando express 

// Middlewares 

// app.use(cors(corOptions)); // implementando los cors 

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 


// Importando el módulo de las rutas para poder accederlas 

const router = require('./routes/productsRouter');

app.use('/api/products', router); 


// Implementando la carpeta estática en donde se alojarán las imágenes de la app 

app.use('/images', express.static('./images'));


// Testeando la app

app.get('/', (req, res) => {
    res.json({ message: 'hello from api' });
});

// Estableciendo el puerto de la app

const PORT = process.env.PORT || 8080;

// Levantando el servidor de la app 

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});