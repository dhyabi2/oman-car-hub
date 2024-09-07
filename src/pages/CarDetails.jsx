import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCarById } from '../utils/indexedDB';
import ImageGallery from '../components/ImageGallery';
import { Car, DollarSign, MapPin, Phone, Info, Calendar, Gauge, Zap, Droplet, Palette, DoorOpen, Users, Compass, Award, Key, MessageCircle, Share2 } from 'lucide-react';
import { toast } from "sonner";
import { addReferralToUrl } from '../utils/referral';
import { trackReferralWithIP } from '../utils/referralTracking';

const API_BASE_URL = 'https://oman-car-hub.replit.app';

const CarDetails = ({ language, t }) => {
  const { id } = useParams();
  const location = useLocation();
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      const car = await getCarById(parseInt(id));
      setCarDetails(car);
    };
    fetchCarDetails();

    // Extract referral code from URL
    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get('ref');

    // Track referral when the page loads
    if (referralCode) {
      trackReferralWithIPAndCode(referralCode);
    }
  }, [id, location]);

  const trackReferralWithIPAndCode = async (referralCode) => {
    try {
      // Fetch the public IP
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;

      // Generate source key and track referral
      const response = await fetch(`${API_BASE_URL}/api/generate-source-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip, referralKey: referralCode }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate source key and track referral');
      }

      console.log('Referral tracked successfully');
    } catch (error) {
      console.error('Error tracking referral:', error);
    }
  };

  if (!carDetails) {
    return <div className="container mx-auto px-4 py-8 text-center">{t.loading}</div>;
  }

  const carInfoRows = [
    { icon: <Calendar className="w-5 h-5" />, label: t.year, value: carDetails.year },
    { icon: <Gauge className="w-5 h-5" />, label: t.mileage, value: `${carDetails.mileage} ${t.km}` },
    { icon: <Zap className="w-5 h-5" />, label: t.transmission, value: t[carDetails.transmission.toLowerCase()] },
    { icon: <Droplet className="w-5 h-5" />, label: t.fuelType, value: t[carDetails.fuel_type.toLowerCase()] },
    { icon: <Palette className="w-5 h-5" />, label: t.color, value: t[carDetails.color.toLowerCase()] },
    { icon: <DoorOpen className="w-5 h-5" />, label: t.numberOfDoors, value: carDetails.number_of_doors },
    { icon: <Users className="w-5 h-5" />, label: t.numberOfSeats, value: carDetails.number_of_seats },
    { icon: <Compass className="w-5 h-5" />, label: t.drivetrain, value: t[carDetails.drivetrain.toLowerCase()] },
    { icon: <Award className="w-5 h-5" />, label: t.condition, value: t[carDetails.condition.toLowerCase()] },
  ];

  const listingInfoRows = [
    { icon: <DollarSign className="w-5 h-5" />, label: t.price, value: `${carDetails.price} ${t.currency}` },
    { icon: <Key className="w-5 h-5" />, label: t.vin, value: carDetails.vin },
    { icon: <MapPin className="w-5 h-5" />, label: t.location, value: t[carDetails.location.toLowerCase()] },
    { icon: <Info className="w-5 h-5" />, label: t.sellerType, value: t[carDetails.seller_type.toLowerCase()] },
    { icon: <Calendar className="w-5 h-5" />, label: t.listingExpirationDate, value: carDetails.listing_expiration_date },
  ];

  const handleShare = () => {
    const shareUrl = addReferralToUrl(window.location.href);
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success(t.linkCopied || 'Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
        toast.error(t.copyFailed || 'Failed to copy link');
      });
  };

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
              <Table>
                <TableBody>
                  {carInfoRows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex items-center">
                        {row.icon}
                        <span className="ml-2">{row.label}</span>
                      </TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Info className="mr-2" /> {t.listingDetails}
              </h2>
              <Table>
                <TableBody>
                  {listingInfoRows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex items-center">
                        {row.icon}
                        <span className="ml-2">{row.label}</span>
                      </TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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

          <div className="mt-8 flex justify-center space-x-4">
            <Button
              size="icon"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => window.open(`https://wa.me/968${carDetails.contact_phone}`, '_blank')}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => window.open(`tel:${carDetails.contact_phone}`, '_blank')}
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarDetails;