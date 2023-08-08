const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    comment: String,
    rating: Number,
});

module.exports.Comment = new model('Comment', commentSchema); 