const config = require("../config");
const nodemailer = require("nodemailer");

const sendEmailContactUs = (data) => {
  const { first_name, last_name, phone, address, message } = data;
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: config.nodemailerService,
      auth: {
        user: config.nodemailerUser,
        pass: config.nodemailerPassword,
      },
    });

    var mailOptions = {
      from: config.nodemailerUser,
      to: config.nodemailerUser,
      subject: `${first_name} ${last_name} can contact you`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Contact Us Email</title>
      </head>
      <body>
          <h1>Contact Us Request</h1>
          <p><strong>Name:</strong> ${first_name} ${last_name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
      </body>
      </html>
    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject({
          status: 421,
          message: error.message,
        });
      } else {
        resolve({
          message: "Success sending contact",
          success: true,
        });
      }
    });
  });
};

module.exports = { sendEmailContactUs };
