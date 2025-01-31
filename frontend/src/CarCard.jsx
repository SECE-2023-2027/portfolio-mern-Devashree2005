import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      
      <img 
        src={car.imageUrl} 
        alt={car.name} 
        className="car-image" 
      />
      
      <h3>{car.name}</h3>
      <p>{car.shortDescription}</p>
      <Link to={`/car/${car.id}`}>View Details</Link> 
    </div>
  );
};

export default CarCard;
