const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
    .then(() =>
        console.log("Connection successfully...")
    ).catch((err) =>
        console.log("Eroor..." + err)
    );

module.exports = mongoose;