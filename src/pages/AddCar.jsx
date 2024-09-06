import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { addCar } from '../utils/indexedDB';
import { MakeModelSelect, MileageInput, PriceRangeInput, ColorSelector, FuelTypeSelector, TransmissionSelector, DoorsSelector, SeatsSelector, DrivetrainSelector, ConditionSelector } from '../components/CarFormFields';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const AddCar = ({ language, t }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    make: '', model: '', year: new Date().getFullYear(), mileage: 0,
    transmission: '', fuel_type: '', engine_size: 1500, color: '',
    number_of_doors: 4, number_of_seats: 5, drivetrain: 'FWD',
    condition: 'Used', price: 10000, vin: '', location: '',
    seller_type: 'Private', description: '', photos: [],
    contact_phone: '', listing_expiration_date: null, additional_features: '',
  });

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.make && formData.model;
      case 2:
        return formData.year && formData.mileage && formData.transmission && formData.fuel_type;
      case 3:
        return formData.color && formData.number_of_doors && formData.number_of_seats && formData.drivetrain;
      case 4:
        return formData.condition && formData.price && formData.location;
      case 5:
        return formData.description && formData.contact_phone;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prevStep => prevStep + 1);
    } else {
      toast.error(t.pleaseAllRequiredFields);
    }
  };

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const photosPromises = formData.photos.map(photo => 
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(photo);
        })
      );
      const photoBase64Strings = await Promise.all(photosPromises);

      const carData = {
        ...formData,
        photos: photoBase64Strings,
        listing_expiration_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      await addCar(carData);
      toast.success(t.carListingAddedSuccess);
      navigate('/cars-list');
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error(t.failedToAddCarListing);
    }
  };

  const validateForm = () => {
    const requiredFields = ['make', 'model', 'year', 'mileage', 'transmission', 'fuel_type', 'color', 'price', 'location', 'contact_phone'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error(`${t.pleaseAllRequiredFields}: ${emptyFields.map(field => t[field]).join(', ')}`);
      return false;
    }

    if (!/^\d{8}$/.test(formData.contact_phone)) {
      toast.error(t.invalidPhoneNumber);
      return false;
    }

    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <MakeModelSelect
              make={formData.make}
              model={formData.model}
              onMakeChange={(value) => handleInputChange('make', value)}
              onModelChange={(value) => handleInputChange('model', value)}
              t={t}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="year">{t.year}</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
            />
            <MileageInput
              value={formData.mileage}
              onChange={(value) => handleInputChange('mileage', value)}
              t={t}
            />
            <TransmissionSelector
              value={formData.transmission}
              onChange={(value) => handleInputChange('transmission', value)}
              t={t}
            />
            <FuelTypeSelector
              value={formData.fuel_type}
              onChange={(value) => handleInputChange('fuel_type', value)}
              t={t}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <ColorSelector
              value={formData.color}
              onChange={(value) => handleInputChange('color', value)}
              t={t}
            />
            <DoorsSelector
              value={formData.number_of_doors}
              onChange={(value) => handleInputChange('number_of_doors', value)}
              t={t}
            />
            <SeatsSelector
              value={formData.number_of_seats}
              onChange={(value) => handleInputChange('number_of_seats', value)}
              t={t}
            />
            <DrivetrainSelector
              value={formData.drivetrain}
              onChange={(value) => handleInputChange('drivetrain', value)}
              t={t}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <ConditionSelector
              value={formData.condition}
              onChange={(value) => handleInputChange('condition', value)}
              t={t}
            />
            <PriceRangeInput
              minPrice={formData.price}
              maxPrice={formData.price}
              onChange={(_, value) => handleInputChange('price', value)}
              t={t}
            />
            <Label htmlFor="location">{t.location}</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <Label htmlFor="description">{t.description}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
            />
            <Label htmlFor="contact_phone">{t.contactPhone}</Label>
            <Input
              id="contact_phone"
              type="tel"
              value={formData.contact_phone}
              onChange={(e) => handleInputChange('contact_phone', e.target.value)}
              pattern="[0-9]*"
              maxLength={8}
              placeholder={t.phoneNumberPlaceholder}
            />
            <Label htmlFor="photos">{t.uploadPhotos}</Label>
            <Input
              id="photos"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleInputChange('photos', Array.from(e.target.files))}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t.addCarForSale}</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(step / 5) * 100} className="mb-4" />
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button type="button" onClick={handlePrevious}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> {t.previous}
                </Button>
              )}
              {step < 5 ? (
                <Button type="button" onClick={handleNext}>
                  {t.next} <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit">
                  {t.submitListing} <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCar;