import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { carMakes, carModels, colors, locations } from '../utils/carData';
import { addCar } from '../utils/indexedDB';

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

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await addCar(formData);
      toast.success('Car listing added successfully!');
      navigate('/cars-list');
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error('Failed to add car listing. Please try again.');
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    const filePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises)
      .then(results => {
        setFormData(prevState => ({
          ...prevState,
          photos: results
        }));
      })
      .catch(error => {
        console.error('Error processing images:', error);
        toast.error('Error uploading images. Please try again.');
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add a Car for Sale</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Basic Information">
              <SelectField
                label="Make"
                value={formData.make}
                onChange={(value) => handleInputChange('make', value)}
                options={carMakes}
              />
              <SelectField
                label="Model"
                value={formData.model}
                onChange={(value) => handleInputChange('model', value)}
                options={formData.make ? carModels[formData.make] : []}
                disabled={!formData.make}
              />
              <SliderField
                label="Year"
                value={formData.year}
                onChange={(value) => handleInputChange('year', value[0])}
                min={1990}
                max={new Date().getFullYear()}
              />
              <SliderField
                label="Mileage (km)"
                value={formData.mileage}
                onChange={(value) => handleInputChange('mileage', value[0])}
                min={0}
                max={300000}
                step={1000}
              />
            </FormSection>

            <FormSection title="Vehicle Details">
              <RadioGroupField
                label="Transmission"
                value={formData.transmission}
                onChange={(value) => handleInputChange('transmission', value)}
                options={["Automatic", "Manual", "Semi-Automatic", "CVT"]}
              />
              <RadioGroupField
                label="Fuel Type"
                value={formData.fuel_type}
                onChange={(value) => handleInputChange('fuel_type', value)}
                options={["Petrol", "Diesel", "Hybrid", "Electric", "LPG", "CNG"]}
              />
              <SliderField
                label="Engine Size (cc)"
                value={formData.engine_size}
                onChange={(value) => handleInputChange('engine_size', value[0])}
                min={500}
                max={8000}
                step={100}
              />
              <SelectField
                label="Color"
                value={formData.color}
                onChange={(value) => handleInputChange('color', value)}
                options={colors}
              />
              <RadioGroupField
                label="Number of Doors"
                value={formData.number_of_doors.toString()}
                onChange={(value) => handleInputChange('number_of_doors', parseInt(value))}
                options={["2", "3", "4", "5"]}
              />
              <RadioGroupField
                label="Number of Seats"
                value={formData.number_of_seats.toString()}
                onChange={(value) => handleInputChange('number_of_seats', parseInt(value))}
                options={["2", "4", "5", "7", "8"]}
              />
              <RadioGroupField
                label="Drivetrain"
                value={formData.drivetrain}
                onChange={(value) => handleInputChange('drivetrain', value)}
                options={["FWD", "RWD", "AWD", "4WD"]}
              />
              <RadioGroupField
                label="Condition"
                value={formData.condition}
                onChange={(value) => handleInputChange('condition', value)}
                options={["New", "Used", "Certified Pre-Owned"]}
              />
            </FormSection>

            <FormSection title="Listing Details">
              <SliderField
                label="Price (OMR)"
                value={formData.price}
                onChange={(value) => handleInputChange('price', value[0])}
                min={1000}
                max={100000}
                step={50}
              />
              <InputField
                label="VIN (Optional)"
                value={formData.vin}
                onChange={(e) => handleInputChange('vin', e.target.value)}
              />
              <SelectField
                label="Location"
                value={formData.location}
                onChange={(value) => handleInputChange('location', value)}
                options={locations}
              />
              <RadioGroupField
                label="Seller Type"
                value={formData.seller_type}
                onChange={(value) => handleInputChange('seller_type', value)}
                options={["Private", "Dealer"]}
              />
              <InputField
                label="Contact Phone"
                type="tel"
                value={formData.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
              />
              <DatePickerField
                label="Listing Expiration Date"
                value={formData.listing_expiration_date}
                onChange={(date) => handleInputChange('listing_expiration_date', date ? date.toISOString() : null)}
              />
            </FormSection>

            <FormSection title="Additional Information">
              <TextareaField
                label="Description (Optional)"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
              <TextareaField
                label="Additional Features (Optional)"
                value={formData.additional_features}
                onChange={(e) => handleInputChange('additional_features', e.target.value)}
              />
            </FormSection>

            <div>
              <Label htmlFor="photos">Photos (Max 10)</Label>
              <Input id="photos" type="file" multiple onChange={handlePhotoUpload} accept="image/*" />
              {formData.photos.length > 0 && (
                <div className="mt-2">
                  <p>{formData.photos.length} file(s) selected</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-2">
                    {formData.photos.map((photo, index) => (
                      <img key={index} src={photo} alt={`Uploaded car ${index + 1}`} className="w-full h-24 object-cover rounded" />
                    ))}
                  </div>
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

const FormSection = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options, disabled = false }) => (
  <div>
    <Label htmlFor={label}>{label}</Label>
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const RadioGroupField = ({ label, value, onChange, options }) => (
  <div>
    <Label>{label}</Label>
    <RadioGroup value={value} onValueChange={onChange}>
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <RadioGroupItem value={option} id={`${label}-${option}`} />
          <Label htmlFor={`${label}-${option}`}>{option}</Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);

const SliderField = ({ label, value, onChange, min, max, step = 1 }) => (
  <div>
    <Label>{label} ({value})</Label>
    <Slider
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={onChange}
    />
  </div>
);

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div>
    <Label htmlFor={label}>{label}</Label>
    <Input id={label} type={type} value={value} onChange={onChange} />
  </div>
);

const TextareaField = ({ label, value, onChange }) => (
  <div>
    <Label htmlFor={label}>{label}</Label>
    <Textarea id={label} value={value} onChange={onChange} />
  </div>
);

const DatePickerField = ({ label, value, onChange }) => (
  <div>
    <Label>{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(new Date(value), "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  </div>
);

export default AddCar;