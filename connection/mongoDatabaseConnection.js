const mongoose = require("mongoose");
require("dotenv");
//Doute: whey process .env has URI only?

const { MONGO_URI } = process.env;

const MongoConnection = (mongoose.connection = () => {
  // Connecting to the database

  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
});

module.exports = { MongoConnection };
