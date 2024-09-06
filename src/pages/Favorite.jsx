import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFavoriteCars, removeFavoriteCar } from '../utils/indexedDB';
import { Heart, Trash2 } from 'lucide-react';

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
                <div className="flex justify-between">
                  <Button onClick={() => handleViewDetails(car.id)}>{t.viewDetails}</Button>
                  <Button variant="outline" onClick={() => handleRemoveFavorite(car.id)}>
                    <Trash2 className="mr-2" />
                    {t.remove}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">{t.noFavoriteCars}</p>
      )}
    </div>
  );
};

export default Favorite;