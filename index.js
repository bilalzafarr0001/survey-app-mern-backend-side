const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config");

const connect = (url) => {
  return mongoose.connect(url, config.db.options);
};

if (require.main === module) {
  app.listen(config.port);
  connect(config.db.prod);
  mongoose.connection.on("error", (err, res) => {
    console.log("Error to connect db ");
  });
  mongoose.connection.on("connected", (err, res) => {
    console.log("Mongoose Database is connected");
  });
}

module.exports = { connect };
