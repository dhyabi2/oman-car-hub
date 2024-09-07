import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFavoriteCars, removeFavoriteCar } from '../utils/indexedDB';
import { Heart, Trash2, Eye, Phone, MessageCircle, Share2 } from 'lucide-react';
import { toast } from "sonner";

const Favorite = ({ language, t }) => {
  const [favoriteCars, setFavoriteCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteCars = async () => {
      const cars = await getFavoriteCars();
      setFavoriteCars(cars);
    };
    fetchFavoriteCars();
  }, []);

  const handleRemoveFavorite = async (carId) => {
    await removeFavoriteCar(carId);
    setFavoriteCars(favoriteCars.filter(car => car.id !== carId));
  };

  const handleViewDetails = (carId) => {
    navigate(`/car/${carId}`);
  };

  const handleShare = (car) => {
    const shareUrl = `${window.location.origin}/car/${car.id}`;
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
      <h1 className="text-3xl font-bold mb-6">{t.favoriteCars}</h1>
      {favoriteCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteCars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="relative pb-[75%]">
                <img
                  src={car.photos[0]}
                  alt={`${car.make} ${car.model}`}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{car.year} {car.make} {car.model}</h2>
                <p className="text-3xl font-bold text-red-600 mb-4">{car.price} {t.currency}</p>
                <div className="flex justify-between items-center">
                  <Button size="sm" onClick={() => handleViewDetails(car.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    {t.viewDetails}
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => window.open(`https://wa.me/968${car.contact_phone}`, '_blank')}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => window.open(`tel:${car.contact_phone}`, '_blank')}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleShare(car)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleRemoveFavorite(car.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-2xl font-semibold text-gray-600 mb-2">{t.noFavoriteCars}</p>
          <p className="text-gray-500">{t.addSomeFavorites}</p>
        </div>
      )}
    </div>
  );
};

export default Favorite;