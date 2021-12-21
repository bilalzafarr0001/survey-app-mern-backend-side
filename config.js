module.exports = {
  port: 8000,
  db: {
    prod: "mongodb+srv://muhammadbilal:gSVYcdEmbGoMAKJ4@cluster0.htpyq.mongodb.net/survey?retryWrites=true&w=majority",

    options: {
      useNewUrlParser: true,
    },
  },
  jwt: {
    expiry: "7d",
  },
};
