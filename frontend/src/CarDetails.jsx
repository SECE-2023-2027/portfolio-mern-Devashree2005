import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [showReceipt, setShowReceipt] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const carData = {
    1: {
      name: "Tesla Model S",
      description: "A high-performance electric sedan with cutting-edge technology and luxurious features.",
      price: "$79,990",
      features: [
        "Autopilot",
        "Electric Powertrain",
        "Long Range",
        "Premium Interior",
      ],
      imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-S/5252/1611840999494/front-left-side-47.jpg",
    },
    2: {
      name: "BMW X5",
      description: "A premium SUV with great performance, off-road capabilities, and a luxurious cabin.",
      price: "$60,000",
      features: [
        "All-Wheel Drive",
        "M Sport Package",
        "Advanced Safety Features",
        "Leather Seats",
      ],
      imageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/152681/x5-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80",
    },
    3: {
      name: "Audi A8",
      description: "A luxury sedan that combines advanced technology, exceptional comfort, and powerful performance.",
      price: "$85,000",
      features: [
        "Quattro All-Wheel Drive",
        "Adaptive Cruise Control",
        "Virtual Cockpit",
        "Heated and Ventilated Seats",
      ],
      imageUrl: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/124141/a8-l-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80&q=80",
    },
    4: {
      name: "Mercedes-Benz E-Class",
      description: "A luxury sedan offering a perfect blend of performance, comfort, and cutting-edge technology.",
      price: "$70,000",
      features: [
        "MBUX Infotainment System",
        "Burmester Audio",
        "Adaptive LED Headlights",
        "Automatic Parking",
      ],
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8KAKJKe5gg85_9fO2wtciaV2-SXBpSlcrKQ&s",
    },
    5: {
      name: "Porsche 911",
      description: "An iconic sports car that blends exhilarating performance with luxurious design.",
      price: "$120,000",
      features: [
        "Turbocharged Engine",
        "Porsche Active Suspension Management",
        "All-Wheel Drive",
        "Sport Chrono Package",
      ],
      imageUrl: "https://files.porsche.com/filestore/image/multimedia/none/911-tus-modelimage-sideshot/model/930894f1-6214-11ea-80c8-005056bbdc38/porsche-model.png",
    },
  };

  const car = carData[id];

  if (!car) {
    return <h2>Car not found</h2>;
  }

  const handleBooking = async () => {
    const carPrice = parseFloat(car.price.replace(/[^\d.-]/g, ""));
    const enteredAmount = parseFloat(amount);

    // Validate amount
    if (isNaN(enteredAmount) || enteredAmount <= 0) {
      setAmountError("Please enter a valid amount.");
      return;
    }

    if (enteredAmount !== carPrice) {
      setAmountError("Amount does not match the car price.");
      return;
    } else {
      setAmountError("");
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(userDetails.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    // Validate phone number
    if (!/^\d{10}$/.test(userDetails.phone)) {
      setPhoneError("Please enter a valid phone number (10 digits).");
      return;
    } else {
      setPhoneError("");
    }

    const bookingData = {
      carName: car.name,
      amountPaid: enteredAmount,
      userDetails: userDetails,
    };

    try {
      const response = await fetch("https://car-rentalbackend-4.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const data = await response.json();
        setShowReceipt(true);
        setIsModalOpen(false);
        console.log("Booking successful:", data);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error booking car:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBooking();
  };

  return (
    <div className="car-details">
      <p>{car.name}</p>
      <img src={car.imageUrl} alt={car.name} />
      <p>{car.description}</p>
      <h3>Price: {car.price}</h3>
      <h4>Features:</h4>
      <ul>
        {car.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className="book-now-button" onClick={() => setIsModalOpen(true)}>
        Book Now
      </button>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter Booking Amount</h3>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {amountError && <p style={{ color: "red" }}>{amountError}</p>}
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
                <label>Phone:</label>
                <input
                  type="text"
                  value={userDetails.phone}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, phone: e.target.value })
                  }
                  required
                />
                {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
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
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                  required
                />
                {emailError && <p style={{ color: "red" }}>{emailError}</p>}
              </div>
              <button type="submit">Confirm Booking</button>
            </form>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Receipt Section */}
      {showReceipt && (
        <div className="receipt">
          <p><b>Booking Receipt</b></p>
          <p>Car: {car.name}</p>
          <p>Price: {car.price}</p>
          <p>Amount Paid: ${amount}</p>
          <p>Name: {userDetails.name}</p>
          <p>Phone: {userDetails.phone}</p>
          <p>Address: {userDetails.address}</p>
          <p>Email: {userDetails.email}</p>
          <button onClick={() => setShowReceipt(false)}>Close Receipt</button>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
