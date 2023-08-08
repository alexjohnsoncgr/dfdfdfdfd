const _ = require('lodash');
const { Comment } = require('../models/comments');
const { Product } = require('../models/product');
const { Rating } = require('../models/rating');

module.exports.postComment = async (req, res) => {
    const userId = req.user._id;
    const comment = _.pick(req.body, ['productId', 'comment', 'rating']);
    const productRating = _.pick(req.body, ['productId', 'rating']);
    comment["userId"] = userId;
    let newComment = new Comment(comment);
    let newRating = new Rating(productRating);
    await newComment.save(); //save new comment
    await newRating.save(); //save rating

    let calculateRating = await Rating.find({ productId: req.body.productId });
    calculateRating = calculateRating.map(item => parseInt(item.rating));
    const ratingLength = calculateRating.length;
    let ratingSum = calculateRating.reduce((ratingSum, rating) => ratingSum + rating, 0);
    const finalRating = (ratingSum / ratingLength).toFixed(2);
    await Product.updateOne({ _id: req.body.productId }, { rating: finalRating });
    return res.status(200).send("Submit Comment Successfully!");

}
module.exports.loadComment = async (req, res) => {
    const productId = req.params.id;
    const comment = await Comment.find({ productId: productId }).populate('userId', 'name');
    return res.status(200).send(comment);
}
