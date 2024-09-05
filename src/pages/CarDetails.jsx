import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const CarDetails = () => {
  const { id } = useParams();
  
  // Fetch car details from localStorage
  const cars = JSON.parse(localStorage.getItem('cars') || '[]');
  const carDetails = cars.find(car => car.id.toString() === id);

  if (!carDetails) {
    return <div>Car not found</div>;
  }

  const renderCarImage = (photo) => {
    if (typeof photo === 'string') {
      if (photo.startsWith('data:image')) {
        return photo; // It's a base64 encoded image
      } else if (photo.startsWith('http')) {
        return `https://preview--oman-car-hub.gptengineer.run${photo}`; // It's a URL, prepend the new host
      }
    }
    return '/placeholder.svg'; // Fallback to placeholder
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{carDetails.year} {carDetails.make} {carDetails.model}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Car Information</h2>
              <ul className="space-y-2">
                <li><strong>Make:</strong> {carDetails.make}</li>
                <li><strong>Model:</strong> {carDetails.model}</li>
                <li><strong>Year:</strong> {carDetails.year}</li>
                <li><strong>Mileage:</strong> {carDetails.mileage} km</li>
                <li><strong>Transmission:</strong> {carDetails.transmission}</li>
                <li><strong>Fuel Type:</strong> {carDetails.fuel_type}</li>
                <li><strong>Engine Size:</strong> {carDetails.engine_size} cc</li>
                <li><strong>Color:</strong> {carDetails.color}</li>
                <li><strong>Number of Doors:</strong> {carDetails.number_of_doors}</li>
                <li><strong>Number of Seats:</strong> {carDetails.number_of_seats}</li>
                <li><strong>Drivetrain:</strong> {carDetails.drivetrain}</li>
                <li><strong>Condition:</strong> {carDetails.condition}</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Listing Details</h2>
              <ul className="space-y-2">
                <li><strong>Price:</strong> {carDetails.price} OMR</li>
                <li><strong>VIN:</strong> {carDetails.vin}</li>
                <li><strong>Location:</strong> {carDetails.location}</li>
                <li><strong>Seller Type:</strong> {carDetails.seller_type}</li>
                <li><strong>Listing Expiration:</strong> {carDetails.listing_expiration_date}</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p>{carDetails.description}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Additional Features</h2>
            <p>{carDetails.additional_features}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Photos</h2>
            <ScrollArea className="h-64 w-full">
              <div className="flex space-x-4">
                {carDetails.photos && carDetails.photos.map((photo, index) => (
                  <img key={index} src={renderCarImage(photo)} alt={`${carDetails.make} ${carDetails.model}`} className="w-64 h-48 object-cover" />
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="mt-6 flex justify-center">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.open(`https://wa.me/968${carDetails.contact_phone}`, '_blank')}
            >
              Contact Seller on WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarDetails;