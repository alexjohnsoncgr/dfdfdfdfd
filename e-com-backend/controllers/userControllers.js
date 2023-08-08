const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');


module.exports.signUp = async (req, res) => {
    //Input validate
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //user existence in collection
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send("User Already Exist!");
    }
    //save req.body to user
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    //password hashing
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    //generate jwt Token and login automatically
    let token = user.generateJWT();
    try {
        //save final data
        const result = await user.save();
        return res.status(201).send({
            message: "Registration Successful!",
            token: token,
            user: _.pick(result, ['_id', 'name', 'email']),
        });
    } catch (err) {
        return res.status(500).send("Something Failed!");
    }

}

module.exports.signIn = async (req, res) => {
    //user existence check
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("Invalid email or password!");
    }
    //password check
    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) {
        return res.status(400).send("Invalid email or password!");
    }
    //generate token
    try {
        const token = user.generateJWT();
        return res.status(200).send({
            message: "Login Successful!",
            token: token,
            user: _.pick(user, ['_id', 'name', 'email']),
        });
    } catch (err) {
        return res.status(400).send("Something went wrong!");
    }

}