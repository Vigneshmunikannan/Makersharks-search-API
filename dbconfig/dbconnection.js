const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/makersharks', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
}


module.exports = connectDb;
