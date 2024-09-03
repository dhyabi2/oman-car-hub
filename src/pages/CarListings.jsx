import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CarListings = () => {
  // This is a placeholder for car listings data
  const carListings = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2020, price: 10000 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019, price: 9000 },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2021, price: 15000 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Car Listings</h1>
      <Link to="/add-car">
        <Button className="mb-4">Add New Car</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {carListings.map((car) => (
          <Card key={car.id}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{car.make} {car.model}</h2>
              <p>Year: {car.year}</p>
              <p>Price: OMR {car.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CarListings;