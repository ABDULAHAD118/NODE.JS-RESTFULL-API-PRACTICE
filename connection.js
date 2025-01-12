const mongoose = require('mongoose');

const connection = async (url) => {
    await mongoose.connect(url)
}

module.exports = connection;