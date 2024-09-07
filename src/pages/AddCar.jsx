import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { addCar } from '../utils/indexedDB';
import { MakeModelSelect, MileageInput, ColorSelector, FuelTypeSelector, TransmissionSelector, DoorsSelector, SeatsSelector, ConditionSelector, YearSelector } from '../components/CarFormFields';
import { FormSection, ListingDetails, AdditionalInformation, PhotoUpload } from './AddCarComponents';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';

const AddCar = ({ language, t }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('addCarFormData');
    return savedData ? JSON.parse(savedData) : {
      make: '', model: '', year: new Date().getFullYear(), mileage: 0,
      transmission: '', fuel_type: '', engine_size: 1500, color: '',
      number_of_doors: 4, number_of_seats: 5,
      condition: 'Used', price: '', location: '',
      seller_type: 'Private', description: '', photos: [],
      contact_phone: '', listing_expiration_date: null, additional_features: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('addCarFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.make && formData.model && formData.year && formData.mileage;
      case 2:
        return formData.transmission && formData.fuel_type && formData.color;
      case 3:
        return formData.price && formData.location && formData.contact_phone;
      case 4:
        return true; // Description and additional features are now optional
      case 5:
        return formData.photos.length > 0 && formData.photos.length <= 15;
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
      toast.success(t.carListingAddedSuccess);
      localStorage.removeItem('addCarFormData');
      navigate('/cars-list');
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error(t.failedToAddCarListing);
    } finally {
      setIsSubmitting(false);
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

    if (formData.photos.length > 15) {
      toast.error(t.tooManyPhotos);
      return false;
    }

    return true;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <FormSection title={t.basicInformation}>
            <MakeModelSelect
              make={formData.make}
              model={formData.model}
              onMakeChange={(value) => handleInputChange('make', value)}
              onModelChange={(value) => handleInputChange('model', value)}
              t={t}
            />
            <YearSelector
              value={formData.year}
              onChange={(value) => handleInputChange('year', value)}
              t={t}
            />
            <MileageInput
              value={formData.mileage}
              onChange={(value) => handleInputChange('mileage', value)}
              t={t}
            />
          </FormSection>
        );
      case 2:
        return (
          <FormSection title={t.vehicleDetails}>
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
            <ConditionSelector
              value={formData.condition}
              onChange={(value) => handleInputChange('condition', value)}
              t={t}
            />
          </FormSection>
        );
      case 3:
        return (
          <ListingDetails
            formData={formData}
            handleInputChange={handleInputChange}
            t={t}
          />
        );
      case 4:
        return (
          <AdditionalInformation
            formData={formData}
            handleInputChange={handleInputChange}
            t={t}
          />
        );
      case 5:
        return (
          <PhotoUpload
            photos={formData.photos}
            handlePhotoUpload={(files) => handleInputChange('photos', files)}
            t={t}
            maxPhotos={15}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" ref={formRef}>
      <Card>
        <CardHeader>
          <CardTitle>{t.addCarForSale}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`w-1/5 h-2 ${
                    s <= step ? 'bg-primary' : 'bg-gray-200'
                  } transition-all duration-300`}
                />
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button onClick={handlePrevious} variant="outline" disabled={isSubmitting}>
              <ChevronLeft className="mr-2 h-4 w-4" /> {t.previous}
            </Button>
          )}
          {step < 5 ? (
            <Button onClick={handleNext} className="ml-auto" disabled={isSubmitting}>
              {t.next} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="ml-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                <>
                  {t.submitListing} <Check className="ml-2 h-4 w-4" />
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