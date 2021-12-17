module.exports = {
  port: 8000,
  db: {
    prod: "mongodb://localhost/survey",
    test: "mongodb://localhost/survey-test",
    options: {
      useNewUrlParser: true,
    },
  },
  jwt: {
    expiry: "7d",
  },
};
