import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BookingForm = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [amount, setAmount] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [errors, setErrors] = useState({ phone: "", email: "" });

  // Validate Phone Number (Only digits and 10 characters)
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setErrors((prev) => ({ ...prev, phone: "Invalid phone number" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  // Validate Email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if there are validation errors
    if (errors.phone || errors.email) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    const bookingDetails = {
      carName: "Audi A8", // Assuming the car name here
      amountPaid: amount,
      userDetails,
    };

    try {
      const response = await fetch("https://car-rentalbackend-4.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();
      if (response.ok) {
        setShowReceipt(true);
      } else {
        console.error("Booking failed:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="booking-form">
      <h2>Book Car ID: {id}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={userDetails.phone}
            onChange={(e) => {
              setUserDetails({ ...userDetails, phone: e.target.value });
              validatePhone(e.target.value); // Validate phone number
            }}
            required
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={userDetails.address}
            onChange={(e) =>
              setUserDetails({ ...userDetails, address: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={userDetails.email}
            onChange={(e) => {
              setUserDetails({ ...userDetails, email: e.target.value });
              validateEmail(e.target.value); // Validate email
            }}
            required
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label>Enter Booking Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Now</button>
      </form>

      {showReceipt && (
        <div className="receipt">
          <h2>Booking Receipt</h2>
          <p>Car: Audi A8</p>
          <p>Name: {userDetails.name}</p>
          <p>Phone: {userDetails.phone}</p>
          <p>Address: {userDetails.address}</p>
          <p>Email: {userDetails.email}</p>
          <p>Amount Paid: ${amount}</p>
          <button onClick={() => setShowReceipt(false)}>Close Receipt</button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
