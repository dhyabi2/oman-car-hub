import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const CarDetails = () => {
  const { id } = useParams();
  
  // Mock data for demonstration purposes
  const carDetails = {
    id: id,
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    mileage: 30000,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    engine_size: 2500,
    color: 'White',
    number_of_doors: 4,
    number_of_seats: 5,
    drivetrain: 'FWD',
    condition: 'Used',
    price: 25000,
    vin: 'ABC123XYZ456789',
    location: 'Muscat',
    seller_type: 'Private',
    description: 'Well-maintained Toyota Camry with low mileage. Perfect family car with excellent fuel efficiency.',
    additional_features: 'Bluetooth connectivity, Backup camera, Keyless entry',
    photos: [
      'https://example.com/toyota-camry-1.jpg',
      'https://example.com/toyota-camry-2.jpg',
      'https://example.com/toyota-camry-3.jpg'
    ],
    contact_phone: '12345678',
    listing_expiration_date: '2023-12-31'
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
                {carDetails.photos.map((photo, index) => (
                  <img key={index} src={photo} alt={`${carDetails.make} ${carDetails.model}`} className="w-64 h-48 object-cover" />
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