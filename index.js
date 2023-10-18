const express = require("express");
const nodemailer = require('nodemailer');
const passport = require('passport');
const cors = require("cors");
require("dotenv").config();

const { classesRouter } = require("./routes/class.route");
const { userRoute } = require("./routes/user.route");
const { connection } = require("./dataBase/dataBase");
const { client } = require("./dataBase/redis");
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

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
      // Successful login, redirect or respond as needed
      console.log(res)
  });






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
