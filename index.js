const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config");

// const connect = (url) => {
//   return mongoose.connect(url, config.db.options);
// };

if (require.main === module) {
  // connect(config.db.prod);
  mongoose.connect(
    "mongodb+srv://muhammadbilal1:5kEiMH3aN1F1ZKbd@cluster0.htpyq.mongodb.net/survey?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  // app.listen(8000);
  const port = process.env.PORT || 3000;
  const host = "0.0.0.0";

  app.listen(port, host, function () {
    console.log("Listening on Port 8000");
  });
  mongoose.connection.on("error", (err, res) => {
    console.log("Error to connect db ");
  });
  mongoose.connection.on("connected", (err, res) => {
    console.log("Mongoose Database is connected");
  });
}

// module.exports = { connect };
