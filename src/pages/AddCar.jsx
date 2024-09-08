import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { addCar } from '../utils/indexedDB';
import { MakeModelSelect, MileageInput, PriceRangeInput, ColorSelector, FuelTypeSelector, TransmissionSelector, DoorsSelector, SeatsSelector, DrivetrainSelector, ConditionSelector, YearSelector } from '../components/CarFormFields';
import { FormSection, ListingDetails, AdditionalInformation, PhotoUpload } from './AddCarComponents';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { carMakes, carModels } from '../utils/carData';

const AddCar = ({ language }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('addCarFormData');
    return savedData ? JSON.parse(savedData) : {
      make: '', model: '', year: new Date().getFullYear(), mileage: 0,
      transmission: '', fuel_type: '', engine_size: 1500, color: '',
      number_of_doors: 4, number_of_seats: 5, drivetrain: 'FWD',
      condition: 'Used', price: '', vin: '', location: '',
      seller_type: 'Private', description: '', photos: [],
      contact_phone: '', listing_expiration_date: null, additional_features: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('addCarFormData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.make;
      case 2:
        return formData.model;
      case 3:
        return formData.year && formData.mileage;
      case 4:
        return formData.transmission && formData.fuel_type && formData.color;
      case 5:
        return formData.price && formData.location && formData.contact_phone;
      case 6:
        return true; // Description and additional features are optional
      case 7:
        return formData.photos.length > 0 && formData.photos.length <= 15;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prevStep => prevStep + 1);
      window.scrollTo(0, 0);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

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
      toast.success("Car listing added successfully");
      localStorage.removeItem('addCarFormData');
      navigate('/cars-list');
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error("Failed to add car listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const requiredFields = ['make', 'model', 'year', 'mileage', 'transmission', 'fuel_type', 'color', 'price', 'location', 'contact_phone'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error(`Please fill all required fields: ${emptyFields.join(', ')}`);
      return false;
    }

    if (!/^\d{8}$/.test(formData.contact_phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    if (formData.photos.length > 15) {
      toast.error("Too many photos");
      return false;
    }

    return true;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <FormSection title="Select Brand">
            <div>
              <Label htmlFor="make">Make</Label>
              <Select value={formData.make} onValueChange={(value) => handleInputChange('make', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Make" />
                </SelectTrigger>
                <SelectContent>
                  {carMakes.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormSection>
        );
      case 2:
        return (
          <FormSection title="Select Model">
            <div>
              <Label htmlFor="model">Model</Label>
              <Select value={formData.model} onValueChange={(value) => handleInputChange('model', value)} disabled={!formData.make}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  {formData.make && carModels[formData.make]?.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormSection>
        );
      case 3:
        return (
          <FormSection title="Basic Information">
            <YearSelector
              value={formData.year}
              onChange={(value) => handleInputChange('year', value)}
            />
            <MileageInput
              value={formData.mileage}
              onChange={(value) => handleInputChange('mileage', value)}
            />
          </FormSection>
        );
      case 4:
        return (
          <FormSection title="Vehicle Details">
            <TransmissionSelector
              value={formData.transmission}
              onChange={(value) => handleInputChange('transmission', value)}
              language={language}
            />
            <FuelTypeSelector
              value={formData.fuel_type}
              onChange={(value) => handleInputChange('fuel_type', value)}
              language={language}
            />
            <ColorSelector
              value={formData.color}
              onChange={(value) => handleInputChange('color', value)}
              language={language}
            />
            <DoorsSelector
              value={formData.number_of_doors}
              onChange={(value) => handleInputChange('number_of_doors', value)}
              language={language}
            />
            <SeatsSelector
              value={formData.number_of_seats}
              onChange={(value) => handleInputChange('number_of_seats', value)}
              language={language}
            />
            <DrivetrainSelector
              value={formData.drivetrain}
              onChange={(value) => handleInputChange('drivetrain', value)}
              language={language}
            />
            <ConditionSelector
              value={formData.condition}
              onChange={(value) => handleInputChange('condition', value)}
              language={language}
            />
          </FormSection>
        );
      case 5:
        return (
          <ListingDetails
            formData={formData}
            handleInputChange={handleInputChange}
            language={language}
          />
        );
      case 6:
        return (
          <AdditionalInformation
            formData={formData}
            handleInputChange={handleInputChange}
            language={language}
          />
        );
      case 7:
        return (
          <PhotoUpload
            photos={formData.photos}
            handlePhotoUpload={(files) => handleInputChange('photos', files)}
            maxPhotos={15}
            language={language}
          />
        );
      default:
        return null;
    }
  };

  const isRTL = language === 'ar';

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                <div
                  key={s}
                  className={`w-1/7 h-2 ${
                    s <= step ? 'bg-primary' : 'bg-gray-200'
                  } transition-all duration-300`}
                />
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 50 : -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between`}>
          {step > 1 && (
            <Button onClick={handlePrevious} variant="outline" disabled={isSubmitting}>
              {isRTL ? (
                <>
                  Previous <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </>
              )}
            </Button>
          )}
          {step < 7 ? (
            <Button onClick={handleNext} className={isRTL ? 'mr-auto' : 'ml-auto'} disabled={isSubmitting}>
              {isRTL ? (
                <>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Next
                </>
              ) : (
                <>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          ) : (
            <Button onClick={handleSubmit} className={isRTL ? 'mr-auto' : 'ml-auto'} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting
                </>
              ) : (
                <>
                  Submit Listing <Check className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCar;