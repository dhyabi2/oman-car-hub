import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const CarListings = () => {
  const location = useLocation();
  const { brand, model } = location.state || {};
  const [cars, setCars] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    make: brand || '',
    model: model || '',
    year: '',
    mileage: '',
    transmission: '',
    fuel_type: '',
    engine_size: '',
    color: '',
    number_of_doors: '',
    number_of_seats: '',
    drivetrain: '',
    condition: '',
    price: '',
    vin: '',
    location: '',
    seller_type: '',
    description: '',
    photos: [],
    contact_phone: '',
    listing_expiration_date: '',
    additional_features: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCars(prevCars => [...prevCars, formData]);
    setIsFormOpen(false);
    setFormData({
      make: brand || '',
      model: model || '',
      year: '',
      mileage: '',
      transmission: '',
      fuel_type: '',
      engine_size: '',
      color: '',
      number_of_doors: '',
      number_of_seats: '',
      drivetrain: '',
      condition: '',
      price: '',
      vin: '',
      location: '',
      seller_type: '',
      description: '',
      photos: [],
      contact_phone: '',
      listing_expiration_date: '',
      additional_features: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Car Listings for {brand} {model}</h1>
      <Button onClick={() => setIsFormOpen(true)} className="mb-4">Add New Car</Button>
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Add a Car for Sale</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[70vh] px-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Make" name="make" value={formData.make} onChange={handleInputChange} required />
              <Input label="Model" name="model" value={formData.model} onChange={handleInputChange} required />
              <Input type="number" label="Year" name="year" value={formData.year} onChange={handleInputChange} required />
              <Input type="number" label="Mileage (km)" name="mileage" value={formData.mileage} onChange={handleInputChange} required />
              <Select label="Transmission" name="transmission" value={formData.transmission} onChange={handleInputChange} required>
                <option value="">Select Transmission</option>
                {["Automatic", "Manual", "Semi-Automatic", "CVT"].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
              <Select label="Fuel Type" name="fuel_type" value={formData.fuel_type} onChange={handleInputChange} required>
                <option value="">Select Fuel Type</option>
                {["Petrol", "Diesel", "Hybrid", "Electric", "LPG", "CNG"].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
              <Input type="number" label="Engine Size (cc)" name="engine_size" value={formData.engine_size} onChange={handleInputChange} />
              <Input label="Color" name="color" value={formData.color} onChange={handleInputChange} required />
              <Select label="Number of Doors" name="number_of_doors" value={formData.number_of_doors} onChange={handleInputChange} required>
                <option value="">Select Number of Doors</option>
                {[2, 3, 4, 5].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
              <Select label="Number of Seats" name="number_of_seats" value={formData.number_of_seats} onChange={handleInputChange} required>
                <option value="">Select Number of Seats</option>
                {[2, 4, 5, 7, 8].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
              <Select label="Drivetrain" name="drivetrain" value={formData.drivetrain} onChange={handleInputChange} required>
                <option value="">Select Drivetrain</option>
                {["FWD", "RWD", "AWD", "4WD"].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
              <Select label="Condition" name="condition" value={formData.condition} onChange={handleInputChange} required>
                <option value="">Select Condition</option>
                {["New", "Used", "Certified Pre-Owned"].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
              <Input type="number" label="Price (OMR)" name="price" value={formData.price} onChange={handleInputChange} required />
              <Input label="VIN (Vehicle Identification Number)" name="vin" value={formData.vin} onChange={handleInputChange} />
              <Input label="Location" name="location" value={formData.location} onChange={handleInputChange} required />
              <Select label="Seller Type" name="seller_type" value={formData.seller_type} onChange={handleInputChange} required>
                <option value="">Select Seller Type</option>
                {["Private", "Dealer"].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
              <Textarea label="Description" name="description" value={formData.description} onChange={handleInputChange} />
              <Input type="file" label="Photos" name="photos" onChange={handleInputChange} multiple accept="image/*" />
              <Input type="tel" label="Contact Phone" name="contact_phone" value={formData.contact_phone} onChange={handleInputChange} required />
              <Input type="date" label="Listing Expiration Date" name="listing_expiration_date" value={formData.listing_expiration_date} onChange={handleInputChange} />
              <Textarea label="Additional Features" name="additional_features" value={formData.additional_features} onChange={handleInputChange} />
              <Button type="submit">Submit Listing</Button>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{car.make} {car.model} ({car.year})</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Price: {car.price} OMR</p>
              <p>Mileage: {car.mileage} km</p>
              <p>Transmission: {car.transmission}</p>
              <p>Fuel Type: {car.fuel_type}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CarListings;