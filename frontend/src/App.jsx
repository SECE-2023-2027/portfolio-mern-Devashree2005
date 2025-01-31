import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./HomePage";
import CarList from "./CarList";
import CarDetails from "./CarDetails";
import BookingForm from "./BookingForm";
//import LoginSignup from "./LoginSignup";
import Header from "./Header";
import "./index.css";
import Contact from "./Contact";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <Router>
     
      <Header />
      
      <Navbar />
      
      <Routes>
       
        <Route path="/home" element={<HomePage />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/car/:id" element={<CarDetails />} />        
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
   
      
      {/* <Footer /> */}
   
    </Router>
  );
}

export default App;

