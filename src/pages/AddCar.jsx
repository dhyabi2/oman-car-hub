import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, MapPin, User } from "lucide-react";
import { toast } from "sonner";
import { locations } from '../utils/carData';
import { addCar } from '../utils/indexedDB';
import {
  MakeModelSelect,
  MileageInput,
  PriceRangeInput,
  ColorSelector,
  FuelTypeSelector,
  TransmissionSelector,
  DoorsSelector,
  SeatsSelector,
  DrivetrainSelector,
  ConditionSelector
} from '../components/CarFormFields';
import ImageSelector from '../components/ImageSelector';

const AddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    transmission: '',
    fuel_type: '',
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

  const validateForm = () => {
    const requiredFields = ['make', 'model', 'year', 'mileage', 'transmission', 'fuel_type', 'color', 'price', 'location', 'contact_phone'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return false;
    }
    return true;
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
              <MakeModelSelect
                make={formData.make}
                model={formData.model}
                onMakeChange={(value) => handleInputChange('make', value)}
                onModelChange={(value) => handleInputChange('model', value)}
              />
              <MileageInput
                value={formData.mileage}
                onChange={(value) => handleInputChange('mileage', value)}
              />
            </FormSection>

            <FormSection title="Vehicle Details">
              <TransmissionSelector
                value={formData.transmission}
                onChange={(value) => handleInputChange('transmission', value)}
              />
              <FuelTypeSelector
                value={formData.fuel_type}
                onChange={(value) => handleInputChange('fuel_type', value)}
              />
              <ColorSelector
                value={formData.color}
                onChange={(value) => handleInputChange('color', value)}
              />
              <DoorsSelector
                value={formData.number_of_doors}
                onChange={(value) => handleInputChange('number_of_doors', value)}
              />
              <SeatsSelector
                value={formData.number_of_seats}
                onChange={(value) => handleInputChange('number_of_seats', value)}
              />
              <DrivetrainSelector
                value={formData.drivetrain}
                onChange={(value) => handleInputChange('drivetrain', value)}
              />
              <ConditionSelector
                value={formData.condition}
                onChange={(value) => handleInputChange('condition', value)}
              />
            </FormSection>

            <FormSection title="Listing Details">
              <PriceRangeInput
                minPrice={formData.price}
                maxPrice={formData.price}
                onChange={(field, value) => handleInputChange('price', value)}
              />
              <Input
                label="VIN (Optional)"
                value={formData.vin}
                onChange={(e) => handleInputChange('vin', e.target.value)}
              />
              <ImageSelector
                label="Location"
                options={locations.map(location => ({ value: location, icon: <MapPin size={24} /> }))}
                value={formData.location}
                onChange={(value) => handleInputChange('location', value)}
              />
              <ImageSelector
                label="Seller Type"
                options={[
                  { value: 'Private', icon: <User size={24} /> },
                  { value: 'Dealer', icon: <User size={24} /> }
                ]}
                value={formData.seller_type}
                onChange={(value) => handleInputChange('seller_type', value)}
              />
              <div>
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  value={formData.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  required
                />
              </div>
              <DatePickerField
                label="Listing Expiration Date"
                value={formData.listing_expiration_date}
                onChange={(date) => handleInputChange('listing_expiration_date', date ? date.toISOString() : null)}
              />
            </FormSection>

            <FormSection title="Additional Information">
              <Textarea
                label="Description (Optional)"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
              <Textarea
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