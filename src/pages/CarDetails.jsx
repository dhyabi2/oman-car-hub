import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCarById } from '../utils/indexedDB';
import ImageGallery from '../components/ImageGallery';

const CarDetails = ({ language, t }) => {
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
    return <div>{t.loading}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{carDetails.year} {carDetails.make} {carDetails.model}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CarInformation carDetails={carDetails} t={t} />
            <ListingDetails carDetails={carDetails} t={t} />
          </div>
          <Description description={carDetails.description} t={t} />
          <AdditionalFeatures features={carDetails.additional_features} t={t} />
          <ImageGallery photos={carDetails.photos} make={carDetails.make} model={carDetails.model} t={t} />
          <ContactButton phone={carDetails.contact_phone} t={t} />
        </CardContent>
      </Card>
    </div>
  );
};

const CarInformation = ({ carDetails, t }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">{t.carInformation}</h2>
    <ul className="space-y-2">
      {Object.entries({
        [t.make]: carDetails.make,
        [t.model]: carDetails.model,
        [t.year]: carDetails.year,
        [t.mileage]: `${carDetails.mileage} ${t.km}`,
        [t.transmission]: t[carDetails.transmission.toLowerCase()],
        [t.fuelType]: t[carDetails.fuel_type.toLowerCase()],
        [t.engineSize]: `${carDetails.engine_size} ${t.cc}`,
        [t.color]: t[carDetails.color.toLowerCase()],
        [t.numberOfDoors]: carDetails.number_of_doors,
        [t.numberOfSeats]: carDetails.number_of_seats,
        [t.drivetrain]: t[carDetails.drivetrain.toLowerCase()],
        [t.condition]: t[carDetails.condition.toLowerCase()],
      }).map(([key, value]) => (
        <li key={key}><strong>{key}:</strong> {value}</li>
      ))}
    </ul>
  </div>
);

const ListingDetails = ({ carDetails, t }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">{t.listingDetails}</h2>
    <ul className="space-y-2">
      {Object.entries({
        [t.price]: `${carDetails.price} ${t.currency}`,
        [t.vin]: carDetails.vin,
        [t.location]: t[carDetails.location.toLowerCase()],
        [t.sellerType]: t[carDetails.seller_type.toLowerCase()],
        [t.listingExpirationDate]: carDetails.listing_expiration_date,
      }).map(([key, value]) => (
        <li key={key}><strong>{key}:</strong> {value}</li>
      ))}
    </ul>
  </div>
);

const Description = ({ description, t }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-4">{t.description}</h2>
    <p>{description}</p>
  </div>
);

const AdditionalFeatures = ({ features, t }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-4">{t.additionalFeatures}</h2>
    <p>{features}</p>
  </div>
);

const ContactButton = ({ phone, t }) => (
  <div className="mt-6 flex justify-center">
    <Button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      onClick={() => window.open(`https://wa.me/968${phone}`, '_blank')}
    >
      {t.contactSeller}
    </Button>
  </div>
);

export default CarDetails;