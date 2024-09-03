import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AddCarListing = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, photos: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add a Car for Sale</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
          <Input type="text" id="make" name="make" required onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
          <Input type="text" id="model" name="model" required onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
          <Input type="number" id="year" name="year" required onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage (km)</label>
          <Input type="number" id="mileage" name="mileage" required onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">Transmission</label>
          <Select id="transmission" name="transmission" required onChange={handleInputChange}>
            <option value="">Select Transmission</option>
            {["Automatic", "Manual", "Semi-Automatic", "CVT"].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700">Fuel Type</label>
          <Select id="fuel_type" name="fuel_type" required onChange={handleInputChange}>
            <option value="">Select Fuel Type</option>
            {["Petrol", "Diesel", "Hybrid", "Electric", "LPG", "CNG"].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="engine_size" className="block text-sm font-medium text-gray-700">Engine Size (cc)</label>
          <Input type="number" id="engine_size" name="engine_size" onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
          <Input type="text" id="color" name="color" required onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="number_of_doors" className="block text-sm font-medium text-gray-700">Number of Doors</label>
          <Select id="number_of_doors" name="number_of_doors" required onChange={handleInputChange}>
            <option value="">Select Number of Doors</option>
            {[2, 3, 4, 5].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="number_of_seats" className="block text-sm font-medium text-gray-700">Number of Seats</label>
          <Select id="number_of_seats" name="number_of_seats" required onChange={handleInputChange}>
            <option value="">Select Number of Seats</option>
            {[2, 4, 5, 7, 8].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="drivetrain" className="block text-sm font-medium text-gray-700">Drivetrain</label>
          <Select id="drivetrain" name="drivetrain" required onChange={handleInputChange}>
            <option value="">Select Drivetrain</option>
            {["FWD", "RWD", "AWD", "4WD"].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
          <Select id="condition" name="condition" required onChange={handleInputChange}>
            <option value="">Select Condition</option>
            {["New", "Used", "Certified Pre-Owned"].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (OMR)</label>
          <Input type="number" id="price" name="price" required onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="vin" className="block text-sm font-medium text-gray-700">VIN (Vehicle Identification Number)</label>
          <Input type="text" id="vin" name="vin" onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <Input type="text" id="location" name="location" required onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="seller_type" className="block text-sm font-medium text-gray-700">Seller Type</label>
          <Select id="seller_type" name="seller_type" required onChange={handleInputChange}>
            <option value="">Select Seller Type</option>
            {["Private", "Dealer"].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea id="description" name="description" rows="4" onChange={handleInputChange}></Textarea>
        </div>

        <div>
          <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Photos</label>
          <Input type="file" id="photos" name="photos" multiple accept="image/*" onChange={handleFileChange} />
        </div>

        <div>
          <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
          <Input type="tel" id="contact_phone" name="contact_phone" required onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="listing_expiration_date" className="block text-sm font-medium text-gray-700">Listing Expiration Date</label>
          <Input type="date" id="listing_expiration_date" name="listing_expiration_date" onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="additional_features" className="block text-sm font-medium text-gray-700">Additional Features</label>
          <Textarea id="additional_features" name="additional_features" rows="4" onChange={handleInputChange}></Textarea>
        </div>

        <Button type="submit">Submit Listing</Button>
      </form>
    </div>
  );
};

export default AddCarListing;