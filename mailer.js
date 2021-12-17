var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "f178340@nu.edu.pk",
    pass: "nahiananaao",
  },
});

var mailOptions = {
  from: "f178340@nu.edu.pk",
  to: "f178340@nu.edu.pk",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
