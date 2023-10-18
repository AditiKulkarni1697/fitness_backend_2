const express = require("express");
const nodemailer = require('nodemailer');
const cors = require("cors");
require("dotenv").config();

const { classesRouter } = require("./routes/class.route");
const { userRoute } = require("./routes/user.route");
const { connection } = require("./dataBase/dataBase");
const { redis } = require("./dataBase/redis");
const { trainerRouter } = require("./routes/tainer.route");
const { sendEmail } = require("./mailer/mailer");
const { paymentRouter } = require("./routes/payment.route");

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
  res.status(200).send({
    msg: "WEL_COME TO THE WORLD OF FITNESS",
  });
});

// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // Use your email service provider
//   auth: {
//     user: process.env.email, // Your email address
//     pass: process.env.pass // Your email password or app-specific password
//   }
// });

// app.get('/send-email', (req, res) => {
//   const toEmail = req.query.email; // Get the dynamic email from the URL parameter
//   const otp = req.query.otp
//   console.log(toEmail,req.query,"recipient")
//   // Email content
//   const mailOptions = {
//     from: process.env.email,
//     to: toEmail,
//     subject: 'Test Email Subject',
//     text: `Your OTP is ${otp}`
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Email sending failed' });
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.json({ message: 'Email sent successfully' });
//     }
//   });
// });

app.use("/user", userRoute);
app.use("/trainer", trainerRouter);
app.use("/classes", classesRouter);
app.use('/payment', paymentRouter)

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to the Database");
    console.log(
      `server is running on "http://localhost:${process.env.PORT}"`
    );
  } catch (error) {
    console.log(error);
  }
});
