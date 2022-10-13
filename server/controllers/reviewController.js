const db = require('../models'); 

const Review = db.reviews;

// Lógica para crear nuevas reseñas para un determinado producto de la B.D

const addReview = async (req, res) => {

    const id = req.params.id; 
    let data = {

        product_id: id, 
        rating: req.body.rating,
        description: req.body.description
    };

    const review = await Review.create(data); 
    res.status(200).send(review); 
};

// Lógica para listar todas las reseñas de la B.D

const getReviews = async (req, res) => {

    let reviews = await Review.findAll({}); 
    res.status(200).send(reviews); 
}


module.exports = {

    addReview,
    getReviews
};