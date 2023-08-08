const { Schema, model } = require('mongoose');

const ratingSchema = new Schema({

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    rating: Number,
});

module.exports.Rating = new model('Rating', ratingSchema); 