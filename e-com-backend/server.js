require('dotenv/config');
const mongoose = require('mongoose');
const app = require('./app');
const DB = process.env.ATLAS_URL_SERVER.replace('<PASSWORD>', process.env.ATLAS_PASS);

global.__basedir = __dirname;

//SERVER connection
mongoose.connect(DB)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.log("Connection Failed!"));
//PORT initialization
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}!`);
})
