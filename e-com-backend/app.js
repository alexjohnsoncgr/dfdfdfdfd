require('express-async-errors');
const express = require('express');
const compression = require('compression');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const error = require('./middlewares/error');
const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');
const profileRouter = require('./routers/profileRouter');
const paymentRouter = require('./routers/paymentRouter');
const commentRouter = require('./routers/commentRouter');
const orderHistoryRouter = require('./routers/orderHistoryRouter');
const authGoogleRouter = require('./routers/authGoogleRouter');
const authFacebookRouter = require('./routers/authFacebookRouter');
const couponRouter = require('./routers/couponRouter');
const searchRouter = require('./routers/searchRouter');

app.use(express.json());//convert to json format
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(compression());

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/profile', profileRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/comment', commentRouter);
app.use('/api/getOrderHistory', orderHistoryRouter);
app.use('/api/auth/google', authGoogleRouter);
app.use('/api/auth/facebook', authFacebookRouter);
app.use('/api/coupon', couponRouter);
app.use('/api/search', searchRouter);
//using middleware for promise return type error handling
//use it after router function 
app.use(error);

module.exports = app;