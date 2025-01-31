import React from "react";
import CarCard from "./CarCard";

const CarList = () => {
  
  const cars = [
    { 
      id: 1, 
      name: "Tesla Model S", 
      shortDescription: "Electric sedan",
      imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-S/5252/1611840999494/front-left-side-47.jpg"
    },
    { 
      id: 2, 
      name: "BMW X5", 
      shortDescription: "Luxury SUV",
      imageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/152681/x5-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80" 
    },
    { 
      id: 3, 
      name: "Audi A8", 
      shortDescription: "Luxury sedan",
      imageUrl: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/124141/a8-l-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80&q=80"
    },
    { 
      id: 4, 
      name: "Mercedes-Benz E-Class", 
      shortDescription: "Executive sedan",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8KAKJKe5gg85_9fO2wtciaV2-SXBpSlcrKQ&s" // Mercedes-Benz E-Class Image
    },
    { 
      id: 5, 
      name: "Porsche 911", 
      shortDescription: "Sports car",
      imageUrl: "https://files.porsche.com/filestore/image/multimedia/none/911-tus-modelimage-sideshot/model/930894f1-6214-11ea-80c8-005056bbdc38/porsche-model.png" // Porsche 911 Image
    }
  ];

  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} /> 
      ))}
    </div>
  );
};

export default CarList;
