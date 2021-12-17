const router = require("express").Router();

const {
  validateUser,
  signup,
  authenticate,
  listUsers,
  adminlogin,
  find,
} = require("./controllers/users");

const {
  createSurvey,
  listSurveys,
  surveyValidate,
  deleteSurvey,
} = require("./controllers/surveys");

const requireAuth = require("./middlewares/requireAuth");

//routess

//authentication
router.post("/signup", validateUser, signup);
router.post("/authenticate", validateUser, authenticate);
router.post("/adminlogin", validateUser, adminlogin);

//users
router.get("/users", listUsers);
router.get("/user/:username", find);

//surveys
router.post("/surveys", [requireAuth, surveyValidate], createSurvey);
router.get("/surveys", listSurveys);
router.delete("/surveys/:id", deleteSurvey);

module.exports = (app) => {
  app.use("/api", router);

  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      message: error.message,
    });
  });
};
