
// Importando los controladores 

const productController = require('../controllers/productController'); 
const reviewController = require('../controllers/reviewController'); 

// Importando el router de Express 

const router = require('express').Router();


/* Utilizando los enrutadores */

router.post('/addProduct', productController.upload, productController.addProduct); 

router.get('/allProducts', productController.getProducts); 

router.get('/publishedProducts', productController.getPublishedProducts); 


/* Rutas para las reseñas */

router.get('/allReviews', reviewController.getReviews); 

router.post('/addReview/:id', reviewController.addReview);

router.get('/getProductReviews/:id', productController.getProductReviews); 


/* Rutas para los productos */

router.get('/:id', productController.getProduct); 

router.put('/:id', productController.updateProduct); 

router.delete('/:id', productController.deleteProduct); 



// Haciendo exportable este módulo 

module.exports = router;

