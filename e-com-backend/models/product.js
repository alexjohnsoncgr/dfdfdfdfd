const { Schema, model, SchemaTypes } = require('mongoose');
const Joi = require('joi');
const { number } = require('joi');

module.exports.Product = new model('Product', Schema({
    name: String,
    description: String,
    price: Number,
    category: {
        type: Schema.Types.ObjectId, //hold id of the category
        ref: 'Category', //used as foreign key to select property of Category Model
        required: true
    },
    quantity: Number,
    photo: {
        data: Buffer, //convert photo into binary
        contentType: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0,
    }
}, { timestamps: true }));

//validate user input
module.exports.validate = (product) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        description: Joi.string().max(2000).required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        category: Joi.string().required()
    });
    return schema.validate(product);
}