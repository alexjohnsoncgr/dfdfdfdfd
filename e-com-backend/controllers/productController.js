const _ = require('lodash');
const { Product, validate } = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');
const { expression } = require('joi');
const { emitWarning } = require('process');
const { Comment } = require('../models/comments');

module.exports.createProduct = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).send("Something went wrong!");
        }
        const { error } = validate(_.pick(fields, ["name", "description", "price", "category", "quantity"]));
        if (error) return res.status(400).send(error.details[0].message);

        const product = new Product(fields);
        if (files.photo) {
            //check <input type="file" name="photo"/>
            fs.readFile(files.photo.filepath, (err, data) => {
                //data read in binary format
                if (err) return res.status(400).send("Problem in file data!");
                product.photo.data = data;
                product.photo.contentType = files.photo.type;
                product.save((err, result) => {
                    if (err) res.status(500).send("Internal Server error!")
                    return res.status(201).send({
                        message: "Product Created Successfully!",
                        data: _.pick(result, ["name", "description", "price", "category", "quantity"])
                    })
                });
            })
        } else {
            return res.status(400).send("No image provided!");
        }
    })
}

//Query String (?) for various type of showing products
//api/product?order=desc&sortBy=name&limit=10(Example)

module.exports.getProducts = async (req, res) => {
    let order = req.query.order === 'desc' ? -1 : 1;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;//limit come as a string so parse it as a int
    const product = await Product.find().select({ photo: 0 })
        .sort({ [sortBy]: order }).limit(limit).populate('category', 'name');//populate used to fetch Category Model name property using category property id
    return res.status(200).send(product);
}


//Query params (/:)
//Example  /:id , /:bookId etc
module.exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).select({ photo: 0 }).populate('category', 'name');
    if (!product) return res.status(404).send("Product not found!")
    return res.status(200).send(product);

}

module.exports.getPhoto = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).select({ photo: 1, _id: 0 });
    res.set('Content-Type', product.photo.contentType);
    return res.status(200).send(product.photo.data);
}

//get product by id
//collect form data
//update provided form field
//update photo (if provided)
module.exports.updateProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).send("Something went wrong!");
        }
        const updatedFields = _.pick(fields, ["name", "description", "price", "category", "quantity"])
        _.assignIn(product, updatedFields);//replace only provided fields
        if (files.photo) {
            //check <input type="file" name="photo"/>
            fs.readFile(files.photo.filepath, (err, data) => {
                //data read in binary format
                if (err) return res.status(400).send("Problem in file data!");
                product.photo.data = data;
                product.photo.contentType = files.photo.type;
                product.save((err, result) => {
                    if (err) return res.status(500).send("Product Update Failed!")
                    return res.status(201).send({
                        message: "Product Updated Successfully!",
                    })
                });
            })
        } else {
            product.save((err, result) => {
                if (err) return res.status(500).send("Product Update Failed!")
                return res.status(201).send({
                    message: "Product Updated Successfully!",
                })
            });
        }


    })
}

/* Example :    const body = {
                order:"desc",
                sortBy:"price",
                limit:5,
                skip:20,
                filters:{
                    price:[0,1000] from 0 to 100
                    category:['asoia308943i','adwy8738aruw'] category id 
                }
}*/

//Filter product
module.exports.filterProducts = async (req, res) => {
    let order = req.body.order === 'desc' ? -1 : 1;
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 30;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let filters = req.body.filters;
    let args = {};
    for (let key in filters) {
        if (filters[key].length > 0) {
            if (key === "price") {
                //{price :{$gte:0,$lte:1000}}
                args['price'] = {
                    $gte: filters.price[0],
                    $lte: filters.price[1]
                }
            }
            if (key === "category") {
                //{category:{$in:['']}}
                args['category'] = {
                    $in: filters['category']
                }

            }
        }
    }
    const product = await Product.find(args).select({ photo: 0 }).limit(limit).sort({ [sortBy]: order }).skip(skip).populate('category', 'name')
    return res.status(200).send(product);
}