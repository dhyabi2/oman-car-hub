import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

const AddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    engine_size: 1500,
    color: '',
    number_of_doors: 4,
    number_of_seats: 5,
    drivetrain: 'FWD',
    condition: 'Used',
    price: 10000,
    vin: '',
    location: '',
    seller_type: 'Private',
    description: '',
    photos: [],
    contact_phone: '',
    listing_expiration_date: null,
    additional_features: '',
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem('addCarFormData');
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setFormData({ ...parsedData, photos: [] });
    }
  }, []);

  const handleInputChange = (name, value) => {
    setFormData(prevState => {
      const newState = {
        ...prevState,
        [name]: value
      };
      const stateForStorage = { ...newState, photos: [] };
      localStorage.setItem('addCarFormData', JSON.stringify(stateForStorage));
      return newState;
    });
  };

  const validateForm = () => {
    const requiredFields = ['make', 'model', 'year', 'mileage', 'transmission', 'fuel_type', 'color', 'price', 'location', 'contact_phone'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const cars = JSON.parse(localStorage.getItem('cars') || '[]');
    const newCar = { ...formData, id: Date.now() };
    cars.push(newCar);
    localStorage.setItem('cars', JSON.stringify(cars));
    localStorage.removeItem('addCarFormData');
    toast.success('Car listing added successfully!');
    navigate('/cars-list');
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setFormData(prevState => ({
      ...prevState,
      photos: files
    }));
  };

  const carMakes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Hyundai', 'Kia'];
  const carModels = {
    Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit'],
    Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Focus'],
    Chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Camaro'],
    Nissan: ['Altima', 'Rogue', 'Sentra', 'Maxima', 'Murano'],
    BMW: ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
    Audi: ['A4', 'Q5', 'A6', 'Q7', 'A3'],
    Volkswagen: ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf'],
    Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona'],
    Kia: ['Forte', 'Optima', 'Sportage', 'Sorento', 'Telluride'],
  };

  const colors = ['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Brown', 'Orange'];
  const locations = ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Ibri', 'Barka', 'Seeb', 'Rustaq', 'Ibra'];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add a Car for Sale</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="make">Make</Label>
                <Select value={formData.make} onValueChange={(value) => handleInputChange('make', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {carMakes.map((make) => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Select value={formData.model} onValueChange={(value) => handleInputChange('model', value)} disabled={!formData.make}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.make && carModels[formData.make].map((model) => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="year">Year ({formData.year})</Label>
                <Slider
                  min={1990}
                  max={new Date().getFullYear()}
                  step={1}
                  value={[formData.year]}
                  onValueChange={(value) => handleInputChange('year', value[0])}
                />
              </div>
              <div>
                <Label htmlFor="mileage">Mileage (km) ({formData.mileage})</Label>
                <Slider
                  min={0}
                  max={300000}
                  step={1000}
                  value={[formData.mileage]}
                  onValueChange={(value) => handleInputChange('mileage', value[0])}
                />
              </div>
              <div>
                <Label htmlFor="transmission">Transmission</Label>
                <RadioGroup value={formData.transmission} onValueChange={(value) => handleInputChange('transmission', value)}>
                  {["Automatic", "Manual", "Semi-Automatic", "CVT"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`transmission-${option}`} />
                      <Label htmlFor={`transmission-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="fuel_type">Fuel Type</Label>
                <RadioGroup value={formData.fuel_type} onValueChange={(value) => handleInputChange('fuel_type', value)}>
                  {["Petrol", "Diesel", "Hybrid", "Electric", "LPG", "CNG"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`fuel-${option}`} />
                      <Label htmlFor={`fuel-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="engine_size">Engine Size (cc) ({formData.engine_size})</Label>
                <Slider
                  min={500}
                  max={8000}
                  step={100}
                  value={[formData.engine_size]}
                  onValueChange={(value) => handleInputChange('engine_size', value[0])}
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Select value={formData.color} onValueChange={(value) => handleInputChange('color', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="number_of_doors">Number of Doors</Label>
                <RadioGroup value={formData.number_of_doors.toString()} onValueChange={(value) => handleInputChange('number_of_doors', parseInt(value))}>
                  {[2, 3, 4, 5].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.toString()} id={`doors-${option}`} />
                      <Label htmlFor={`doors-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="number_of_seats">Number of Seats</Label>
                <RadioGroup value={formData.number_of_seats.toString()} onValueChange={(value) => handleInputChange('number_of_seats', parseInt(value))}>
                  {[2, 4, 5, 7, 8].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.toString()} id={`seats-${option}`} />
                      <Label htmlFor={`seats-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="drivetrain">Drivetrain</Label>
                <RadioGroup value={formData.drivetrain} onValueChange={(value) => handleInputChange('drivetrain', value)}>
                  {["FWD", "RWD", "AWD", "4WD"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`drivetrain-${option}`} />
                      <Label htmlFor={`drivetrain-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="condition">Condition</Label>
                <RadioGroup value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                  {["New", "Used", "Certified Pre-Owned"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`condition-${option}`} />
                      <Label htmlFor={`condition-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="price">Price (OMR) ({formData.price})</Label>
                <Slider
                  min={1000}
                  max={100000}
                  step={50}
                  value={[formData.price]}
                  onValueChange={(value) => handleInputChange('price', value[0])}
                />
              </div>
              <div>
                <Label htmlFor="vin">VIN (Optional)</Label>
                <Input id="vin" value={formData.vin} onChange={(e) => handleInputChange('vin', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="seller_type">Seller Type</Label>
                <RadioGroup value={formData.seller_type} onValueChange={(value) => handleInputChange('seller_type', value)}>
                  {["Private", "Dealer"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`seller-${option}`} />
                      <Label htmlFor={`seller-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input id="contact_phone" type="tel" value={formData.contact_phone} onChange={(e) => handleInputChange('contact_phone', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="listing_expiration_date">Listing Expiration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.listing_expiration_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.listing_expiration_date ? format(new Date(formData.listing_expiration_date), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.listing_expiration_date ? new Date(formData.listing_expiration_date) : undefined}
                      onSelect={(date) => handleInputChange('listing_expiration_date', date ? date.toISOString() : null)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="additional_features">Additional Features (Optional)</Label>
              <Textarea id="additional_features" value={formData.additional_features} onChange={(e) => handleInputChange('additional_features', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="photos">Photos (Max 10)</Label>
              <Input id="photos" type="file" multiple onChange={handlePhotoUpload} accept="image/*" />
              {formData.photos.length > 0 && (
                <div className="mt-2">
                  <p>{formData.photos.length} file(s) selected</p>
                </div>
              )}
            </div>
            <Button type="submit" className="w-full">Submit Listing</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCar;