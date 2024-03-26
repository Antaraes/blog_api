const nodemailer = require("nodemailer");
exports.sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      secure: true,
      auth: {
        user: process.env.SEND_USER,
        pass: process.env.SEND_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.COMPANY_NAME,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};
