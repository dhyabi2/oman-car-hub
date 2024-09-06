import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { addCar } from '../utils/indexedDB';
import { MakeModelSelect, MileageInput, PriceRangeInput, ColorSelector, FuelTypeSelector, TransmissionSelector, SeatsSelector, DrivetrainSelector, ConditionSelector } from '../components/CarFormFields';
import { carMakes, carModels, locations } from '../utils/carData';
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Car, DollarSign, Camera, FileText, CheckCircle } from 'lucide-react';

const AddCar = ({ language, t }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    make: '', model: '', year: new Date().getFullYear(), mileage: 0,
    transmission: '', fuel_type: '', engine_size: 1500, color: '',
    number_of_seats: 5, drivetrain: 'FWD',
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
        return formData.make && formData.model && formData.year && formData.mileage;
      case 2:
        return formData.transmission && formData.fuel_type && formData.color && formData.condition;
      case 3:
        return formData.price && formData.location && formData.contact_phone;
      case 4:
        return formData.description && formData.additional_features;
      case 5:
        return formData.photos.length > 0;
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
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center"><Car className="mr-2" /> {t.basicInformation}</h2>
            <MakeModelSelect
              make={formData.make}
              model={formData.model}
              onMakeChange={(value) => handleInputChange('make', value)}
              onModelChange={(value) => handleInputChange('model', value)}
              t={t}
            />
            <div className="mt-4">
              <Label htmlFor="year">{t.year}</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            <MileageInput
              value={formData.mileage}
              onChange={(value) => handleInputChange('mileage', value)}
              t={t}
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center"><Car className="mr-2" /> {t.vehicleDetails}</h2>
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
            <ColorSelector
              value={formData.color}
              onChange={(value) => handleInputChange('color', value)}
              t={t}
            />
            <ConditionSelector
              value={formData.condition}
              onChange={(value) => handleInputChange('condition', value)}
              t={t}
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center"><DollarSign className="mr-2" /> {t.listingDetails}</h2>
            <div className="mb-4">
              <Label htmlFor="price">{t.price} (OMR)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', Number(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="location">{t.location}</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectLocation} />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>{t[location.toLowerCase()] || location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="contact_phone">{t.contactPhone}</Label>
              <Input
                id="contact_phone"
                type="tel"
                value={formData.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value.replace(/\D/g, '').slice(0, 8))}
                pattern="[0-9]*"
                maxLength={8}
                placeholder={t.phoneNumberPlaceholder}
              />
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center"><FileText className="mr-2" /> {t.additionalInformation}</h2>
            <div className="mb-4">
              <Label htmlFor="description">{t.description}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="additional_features">{t.additionalFeatures}</Label>
              <Textarea
                id="additional_features"
                value={formData.additional_features}
                onChange={(e) => handleInputChange('additional_features', e.target.value)}
                rows={4}
              />
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center"><Camera className="mr-2" /> {t.photos}</h2>
            <div className="mb-4">
              <Label htmlFor="photos">{t.uploadPhotos}</Label>
              <Input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleInputChange('photos', Array.from(e.target.files))}
              />
            </div>
            {formData.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {formData.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Car photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </motion.div>
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
                  {t.previous}
                </Button>
              )}
              {step < 5 ? (
                <Button type="button" onClick={handleNext}>
                  {t.next}
                </Button>
              ) : (
                <Button type="submit" className="bg-green-500 hover:bg-green-600">
                  <CheckCircle className="mr-2" />
                  {t.submitListing}
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