import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCarById } from '../utils/indexedDB';
import ImageGallery from '../components/ImageGallery';
import { Car, DollarSign, MapPin, Phone, Info, Calendar, Gauge, Zap, Droplet, Palette, DoorOpen, Users, Compass, Award, Key } from 'lucide-react';

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
    return <div className="container mx-auto px-4 py-8 text-center">{t.loading}</div>;
  }

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5 text-gray-500" />
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {carDetails.year} {carDetails.make} {carDetails.model}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Car className="mr-2" /> {t.carInformation}
              </h2>
              <div className="space-y-2">
                <DetailItem icon={Calendar} label={t.year} value={carDetails.year} />
                <DetailItem icon={Gauge} label={t.mileage} value={`${carDetails.mileage} ${t.km}`} />
                <DetailItem icon={Zap} label={t.transmission} value={t[carDetails.transmission.toLowerCase()]} />
                <DetailItem icon={Droplet} label={t.fuelType} value={t[carDetails.fuel_type.toLowerCase()]} />
                <DetailItem icon={Palette} label={t.color} value={t[carDetails.color.toLowerCase()]} />
                <DetailItem icon={DoorOpen} label={t.numberOfDoors} value={carDetails.number_of_doors} />
                <DetailItem icon={Users} label={t.numberOfSeats} value={carDetails.number_of_seats} />
                <DetailItem icon={Compass} label={t.drivetrain} value={t[carDetails.drivetrain.toLowerCase()]} />
                <DetailItem icon={Award} label={t.condition} value={t[carDetails.condition.toLowerCase()]} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Info className="mr-2" /> {t.listingDetails}
              </h2>
              <div className="space-y-2">
                <DetailItem icon={DollarSign} label={t.price} value={`${carDetails.price} ${t.currency}`} />
                <DetailItem icon={Key} label={t.vin} value={carDetails.vin} />
                <DetailItem icon={MapPin} label={t.location} value={t[carDetails.location.toLowerCase()]} />
                <DetailItem icon={Info} label={t.sellerType} value={t[carDetails.seller_type.toLowerCase()]} />
                <DetailItem icon={Calendar} label={t.listingExpirationDate} value={carDetails.listing_expiration_date} />
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{t.description}</h2>
            <p>{carDetails.description}</p>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{t.additionalFeatures}</h2>
            <p>{carDetails.additional_features}</p>
          </div>

          <Separator className="my-6" />

          <ImageGallery photos={carDetails.photos} make={carDetails.make} model={carDetails.model} t={t} />

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full"
              onClick={() => window.open(`https://wa.me/968${carDetails.contact_phone}`, '_blank')}
            >
              <Phone className="mr-2" />
              {t.contactSellerWhatsApp}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarDetails;