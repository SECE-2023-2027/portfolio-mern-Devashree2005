const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Signup = require('./models/signupSchema');
const Login = require('./models/loginSchema');
const Booking = require('./models/bookingSchema');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connection Successful");
  })
  .catch((err) => {
    console.error("MongoDB Connection Unsuccessful:", err.message);
  });


app.get('/', (req, res) => {
  res.send(`
    Welcome to the backend, my friend!
    Your roller coaster starts now. 
    Fasten your codebase so you can catch up with what's being taught!
  `);
});


app.post('/signup', async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  var hashedpassword = await bcrypt.hash(password, 10);

  try {
    const newSignup = new Signup({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: hashedpassword
    });

    await newSignup.save();
    res.status(201).send("SignUp Successful");
  } catch (err) {
    res.status(400).send({ message: "SignUp Unsuccessful", error: err.message });
  }
});


app.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const newLogin = new Login({
      userName,
      password
    });

    await newLogin.save();
    res.status(201).send("Login Successful");
  } catch (err) {
    res.status(400).send({ message: "Login Unsuccessful", error: err.message });
  }
});


app.get('/getsignupdet', async (req, res) => {
  try {
    const signUpdet = await Signup.find();
    res.status(200).json(signUpdet);
  } catch (err) {
    res.status(500).send({ message: "Error Fetching Data", error: err.message });
  }
});


app.post('/book-car', async (req, res) => {
  const { carName, amountPaid, userDetails } = req.body;

  try {
   
    const newBooking = new Booking({
      carName,
      amountPaid,
      userDetails,
    });

   
    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    res.status(400).json({ message: "Booking failed", error: err.message });
  }
});


app.get('/get-bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
});

// Start Server
app.listen(3002, () => {
    console.log("Server Started on Port 3002");
  });
  
