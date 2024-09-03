import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AddCarForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
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
    // For now, we'll just navigate back to the listings page
    navigate('/car-listings');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Add a Car for Sale</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Make" name="make" type="text" required onChange={handleChange} />
        <Input label="Model" name="model" type="text" required onChange={handleChange} />
        <Input label="Year" name="year" type="number" required onChange={handleChange} />
        <Input label="Mileage (km)" name="mileage" type="number" required onChange={handleChange} />
        <Select label="Transmission" name="transmission" required onChange={handleChange}>
          <option value="">Select Transmission</option>
          {["Automatic", "Manual", "Semi-Automatic", "CVT"].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
        <Select label="Fuel Type" name="fuel_type" required onChange={handleChange}>
          <option value="">Select Fuel Type</option>
          {["Petrol", "Diesel", "Hybrid", "Electric", "LPG", "CNG"].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
        <Input label="Engine Size (cc)" name="engine_size" type="number" onChange={handleChange} />
        <Input label="Color" name="color" type="text" required onChange={handleChange} />
        <Select label="Number of Doors" name="number_of_doors" required onChange={handleChange}>
          <option value="">Select Number of Doors</option>
          {[2, 3, 4, 5].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
        <Select label="Number of Seats" name="number_of_seats" required onChange={handleChange}>
          <option value="">Select Number of Seats</option>
          {[2, 4, 5, 7, 8].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
        <Select label="Drivetrain" name="drivetrain" required onChange={handleChange}>
          <option value="">Select Drivetrain</option>
          {["FWD", "RWD", "AWD", "4WD"].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
        <Select label="Condition" name="condition" required onChange={handleChange}>
          <option value="">Select Condition</option>
          {["New", "Used", "Certified Pre-Owned"].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
        <Input label="Price (OMR)" name="price" type="number" required onChange={handleChange} />
        <Input label="VIN (Vehicle Identification Number)" name="vin" type="text" onChange={handleChange} />
        <Input label="Location" name="location" type="text" required onChange={handleChange} />
        <Select label="Seller Type" name="seller_type" required onChange={handleChange}>
          <option value="">Select Seller Type</option>
          {["Private", "Dealer"].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
        <Textarea label="Description" name="description" onChange={handleChange} />
        <Input label="Contact Phone" name="contact_phone" type="tel" required onChange={handleChange} />
        <Input label="Listing Expiration Date" name="listing_expiration_date" type="date" onChange={handleChange} />
        <Textarea label="Additional Features" name="additional_features" onChange={handleChange} />
        <Button type="submit">Submit Listing</Button>
      </form>
    </div>
  );
};

export default AddCarForm;