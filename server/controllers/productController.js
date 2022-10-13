/* Este archivo será utilizado para definir la lógica de los métodos HTTP relacionados con los 'productos' */

const db = require('../models'); 
const multer = require('multer'); 
const path = require('path'); 

// Accediendo a los métodos que nos ofrece 'Sequelize' para trabajar con las tablas definidas en los modelos

const Product = db.products;
const Review = db.reviews;

// Lógica para crear nuevos productos en la B.D

const addProduct = async (req, res) => {

    let info = {

        image: req.file.path,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false 
    };

    // Creando el nuevo producto
    const product = await Product.create(info); 
    res.status(200).send(product); 
};

// Lógica para listar todos los productos de la B.D

const getProducts = async (req, res) => {

    let products = await Product.findAll({}); 
    res.status(200).send(products);
};

// Lógica para listar el producto de la B.D que coincida el parámetro pasado (ID)

const getProduct = async (req, res) => {

    let id = req.params.id; 
    let product = await Product.findOne({ where: { id: id }}); 
    res.status(200).send(product); 
};

// Lógica para actualizar el producto existente de la B.D que coincida con el parámetro pasado (ID)

const updateProduct = async (req, res) => {

    let id = req.params.id; 
    const product = await Product.update(req.body, { where: { id: id }});
    res.status(200).send(product); 
};

// Lógica para eliminar el producto existente de la B.D que coincida con el parámetro pasado (ID)

const deleteProduct = async (req, res) => {

    let id = req.params.id; 
    await Product.destroy({ where: { id: id }} ); 
    res.status(200).send('Product is deleted !'); 
};

// Lógica para traer todos los productos de la B.D que han sido publicados

const getPublishedProducts = async (req, res) => {

    const products = await Product.findAll({ where: { published: 1 }});
    res.status(200).send(products); 
};

// Lógica para obtener las reseñas de un producto específico

const getProductReviews = async (req, res) => {

    const id = req.params.id; 

    const data = await Product.findOne({ 

        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    });

    res.status(200).send(data); 
}

// Lógica para subir imágenes 

const storage = multer.diskStorage({ 

    destination: (req, file, cb) => { 
        cb(null, 'images'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 

    storage: storage, 
    limits: { fileSize: '1000000' }, 
    fileFilter: (req, file, cb) => { 

        const fileTypes = /jpeg|jpg|png|gif/; 
        const mimeType = fileTypes.test(file.mimetype); 
        const extname = fileTypes.test(path.extname(file.originalname)); 
    
        if(mimeType && extname) {
            return cb(null, true); 
        }
        cb('Give proper files formate to upload'); 
    }
}).single('image'); 


// Exportando los métodos 

module.exports = {

    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getPublishedProducts,
    getProductReviews,
    upload
};