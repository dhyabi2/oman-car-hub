import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AddCar = () => {
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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevState => ({
      ...prevState,
      photos: files.slice(0, 10) // Limit to 10 photos
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add a Car for Sale</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="make">Make</Label>
                <Input id="make" name="make" value={formData.make} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input id="model" name="model" value={formData.model} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" type="number" value={formData.year} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="mileage">Mileage (km)</Label>
                <Input id="mileage" name="mileage" type="number" value={formData.mileage} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="transmission">Transmission</Label>
                <Select name="transmission" onValueChange={(value) => handleSelectChange("transmission", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Automatic", "Manual", "Semi-Automatic", "CVT"].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fuel_type">Fuel Type</Label>
                <Select name="fuel_type" onValueChange={(value) => handleSelectChange("fuel_type", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Petrol", "Diesel", "Hybrid", "Electric", "LPG", "CNG"].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="engine_size">Engine Size (cc)</Label>
                <Input id="engine_size" name="engine_size" type="number" value={formData.engine_size} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input id="color" name="color" value={formData.color} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="number_of_doors">Number of Doors</Label>
                <Select name="number_of_doors" onValueChange={(value) => handleSelectChange("number_of_doors", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of doors" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 3, 4, 5].map((option) => (
                      <SelectItem key={option} value={option.toString()}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="number_of_seats">Number of Seats</Label>
                <Select name="number_of_seats" onValueChange={(value) => handleSelectChange("number_of_seats", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of seats" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2, 4, 5, 7, 8].map((option) => (
                      <SelectItem key={option} value={option.toString()}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="drivetrain">Drivetrain</Label>
                <Select name="drivetrain" onValueChange={(value) => handleSelectChange("drivetrain", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select drivetrain" />
                  </SelectTrigger>
                  <SelectContent>
                    {["FWD", "RWD", "AWD", "4WD"].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select name="condition" onValueChange={(value) => handleSelectChange("condition", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {["New", "Used", "Certified Pre-Owned"].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price (OMR)</Label>
                <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="vin">VIN (Vehicle Identification Number)</Label>
                <Input id="vin" name="vin" value={formData.vin} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="seller_type">Seller Type</Label>
                <Select name="seller_type" onValueChange={(value) => handleSelectChange("seller_type", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select seller type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Private", "Dealer"].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input id="contact_phone" name="contact_phone" type="tel" value={formData.contact_phone} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="listing_expiration_date">Listing Expiration Date</Label>
                <Input id="listing_expiration_date" name="listing_expiration_date" type="date" value={formData.listing_expiration_date} onChange={handleInputChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="additional_features">Additional Features</Label>
              <Textarea id="additional_features" name="additional_features" value={formData.additional_features} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="photos">Photos (Max 10)</Label>
              <Input id="photos" name="photos" type="file" multiple onChange={handleFileChange} accept="image/*" />
            </div>
            <Button type="submit" className="w-full">Submit Listing</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCar;