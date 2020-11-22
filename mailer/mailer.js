const nodemailer = require("nodemailer");

const mailConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "uriah.weissnat@ethereal.email",
    pass: "qBYmyfnRt2kzuYxRxS",
  },
};

module.exports = nodemailer.createTransport(mailConfig);
