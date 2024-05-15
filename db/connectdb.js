const mongoose = require("mongoose");

const connectMongoDB = async (url) => {
  return await mongoose
    .connect(url)
    .then(() => console.log("database connected....."))
    .catch(() => console.log("database not connected....."));
};

module.exports = { connectMongoDB };
