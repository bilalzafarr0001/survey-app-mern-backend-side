const Survey = require("../models/survey");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
var nodemailer = require("nodemailer");

exports.createSurvey = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }
  try {
    const { age, country, designation, techstack, gender } = req.body;
    const user = req.user.id;
    const survey = await Survey.create({
      user,
      designation,
      techstack,
      gender,
      age,
      country,
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "f178340@nu.edu.pk",
        pass: "nahiananaao",
      },
    });
    var mailOptions = {
      from: "f178340@nu.edu.pk",
      to: req.user.email,
      subject: "Sending Email From Admin ",
      text: "Thanks for filling the form. We will be in touch with you.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return res.status(201).json({ survey });
  } catch (error) {
    console.log("Eror while creating a Survey .........");
    next(error);
  }
};

exports.deleteSurvey = async (req, res, next) => {
  try {
    await Survey.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      message: "Survey Successfully Deleted!",
    });
  } catch (error) {
    next(error);
  }
};

exports.listSurveys = async (req, res, next) => {
  try {
    const { sortType = "-score" } = req.body;
    const surveys = await Survey.find().sort(sortType).populate({
      path: "user",
      select: "username",
    });
    return res.status(200).json({ surveys });
  } catch (error) {
    next(error);
  }
};

exports.surveyValidate = [];
