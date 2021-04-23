// node js/express server template  

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const nodemailer = require("nodemailer"); 
require('dotenv').config()

const publicDirectory = (__dirname, 'public');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDirectory);
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

const app = express();

//Middleware
app.use(connectLivereload());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicDirectory));
app.use(express.json());

//Routes
app.get("/", function (req, res)
{
  res.render("index")
});

app.get("/work", function (req, res)
{
  res.render("work.ejs");
});

app.get("/contact", function (req, res)
{
    res.render("contact.ejs");
});

app.post("/contact", function (req, res)
{
  console.log(req.body);


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL_ADDRESS,
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message  
  }

  transporter.sendMail(mailOptions, function (error, info)
  {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success')
    }
  });
});

app.listen(process.env.PORT || 3000);

