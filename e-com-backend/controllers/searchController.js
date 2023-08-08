const { Product } = require('../models/product');

module.exports.searchResult = async (req, res) => {
    const search = req.params.search;
    const result = await Product.find({ name: { $regex: search, $options: "i" } })
    return res.status(200).send({
        result: result,
        search: search,
    });
}