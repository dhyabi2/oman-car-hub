import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCarById } from '../utils/indexedDB';

const CarDetails = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      const car = await getCarById(parseInt(id));
      setCarDetails(car);
    };
    fetchCarDetails();
  }, [id]);

  if (!carDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{carDetails.year} {carDetails.make} {carDetails.model}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CarInformation carDetails={carDetails} />
            <ListingDetails carDetails={carDetails} />
          </div>
          <Description description={carDetails.description} />
          <AdditionalFeatures features={carDetails.additional_features} />
          <Photos photos={carDetails.photos} make={carDetails.make} model={carDetails.model} />
          <ContactButton phone={carDetails.contact_phone} />
        </CardContent>
      </Card>
    </div>
  );
};

const CarInformation = ({ carDetails }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Car Information</h2>
    <ul className="space-y-2">
      {Object.entries({
        Make: carDetails.make,
        Model: carDetails.model,
        Year: carDetails.year,
        Mileage: `${carDetails.mileage} km`,
        Transmission: carDetails.transmission,
        "Fuel Type": carDetails.fuel_type,
        "Engine Size": `${carDetails.engine_size} cc`,
        Color: carDetails.color,
        "Number of Doors": carDetails.number_of_doors,
        "Number of Seats": carDetails.number_of_seats,
        Drivetrain: carDetails.drivetrain,
        Condition: carDetails.condition,
      }).map(([key, value]) => (
        <li key={key}><strong>{key}:</strong> {value}</li>
      ))}
    </ul>
  </div>
);

const ListingDetails = ({ carDetails }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Listing Details</h2>
    <ul className="space-y-2">
      {Object.entries({
        Price: `${carDetails.price} OMR`,
        VIN: carDetails.vin,
        Location: carDetails.location,
        "Seller Type": carDetails.seller_type,
        "Listing Expiration": carDetails.listing_expiration_date,
      }).map(([key, value]) => (
        <li key={key}><strong>{key}:</strong> {value}</li>
      ))}
    </ul>
  </div>
);

const Description = ({ description }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-4">Description</h2>
    <p>{description}</p>
  </div>
);

const AdditionalFeatures = ({ features }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-4">Additional Features</h2>
    <p>{features}</p>
  </div>
);

const Photos = ({ photos, make, model }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-4">Photos</h2>
    <ScrollArea className="h-64 w-full">
      <div className="flex space-x-4">
        {photos && photos.map((photo, index) => (
          <img key={index} src={photo} alt={`${make} ${model}`} className="w-64 h-48 object-cover" />
        ))}
      </div>
    </ScrollArea>
  </div>
);

const ContactButton = ({ phone }) => (
  <div className="mt-6 flex justify-center">
    <Button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      onClick={() => window.open(`https://wa.me/968${phone}`, '_blank')}
    >
      Contact Seller on WhatsApp
    </Button>
  </div>
);

export default CarDetails;