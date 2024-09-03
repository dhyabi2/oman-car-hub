import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CarListings = () => {
  const location = useLocation();
  const { brand, model } = location.state || {};
  const [showForm, setShowForm] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to your backend
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Car Listings for {brand} {model}</h1>
      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        {showForm ? 'Cancel' : 'Add New Car'}
      </Button>
      
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Add a Car for Sale</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Make" name="make" type="text" value={formData.make} onChange={handleChange} required />
            <Input label="Model" name="model" type="text" value={formData.model} onChange={handleChange} required />
            <Input label="Year" name="year" type="number" onChange={handleChange} required />
            <Input label="Mileage (km)" name="mileage" type="number" onChange={handleChange} required />
            
            <Select label="Transmission" name="transmission" onChange={handleChange} required>
              <option value="">Select Transmission</option>
              {["Automatic", "Manual", "Semi-Automatic", "CVT"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            
            <Select label="Fuel Type" name="fuel_type" onChange={handleChange} required>
              <option value="">Select Fuel Type</option>
              {["Petrol", "Diesel", "Hybrid", "Electric", "LPG", "CNG"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            
            <Input label="Engine Size (cc)" name="engine_size" type="number" onChange={handleChange} />
            <Input label="Color" name="color" type="text" onChange={handleChange} required />
            
            <Select label="Number of Doors" name="number_of_doors" onChange={handleChange} required>
              <option value="">Select Number of Doors</option>
              {[2, 3, 4, 5].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            
            <Select label="Number of Seats" name="number_of_seats" onChange={handleChange} required>
              <option value="">Select Number of Seats</option>
              {[2, 4, 5, 7, 8].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            
            <Select label="Drivetrain" name="drivetrain" onChange={handleChange} required>
              <option value="">Select Drivetrain</option>
              {["FWD", "RWD", "AWD", "4WD"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            
            <Select label="Condition" name="condition" onChange={handleChange} required>
              <option value="">Select Condition</option>
              {["New", "Used", "Certified Pre-Owned"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            
            <Input label="Price (OMR)" name="price" type="number" onChange={handleChange} required />
            <Input label="VIN (Vehicle Identification Number)" name="vin" type="text" onChange={handleChange} />
            <Input label="Location" name="location" type="text" onChange={handleChange} required />
            
            <Select label="Seller Type" name="seller_type" onChange={handleChange} required>
              <option value="">Select Seller Type</option>
              {["Private", "Dealer"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
            
            <Textarea label="Description" name="description" onChange={handleChange} className="col-span-2" />
            <Input label="Contact Phone" name="contact_phone" type="tel" onChange={handleChange} required />
            <Input label="Listing Expiration Date" name="listing_expiration_date" type="date" onChange={handleChange} />
            <Textarea label="Additional Features" name="additional_features" onChange={handleChange} className="col-span-2" />
          </div>
          
          <Button type="submit">Submit Listing</Button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placeholder for car listings */}
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{brand} {model}</h2>
              <p>Year: 2023</p>
              <p>Price: OMR 10,000</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CarListings;