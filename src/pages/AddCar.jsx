import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { addCar } from '../utils/indexedDB';
import { MakeSelect, ModelSelect, MileageInput, PriceRangeInput, ColorSelector, FuelTypeSelector, TransmissionSelector, DoorsSelector, SeatsSelector, DrivetrainSelector, ConditionSelector, YearSelector } from '../components/CarFormFields';
import { FormSection, ListingDetails, AdditionalInformation, PhotoUpload } from './AddCarComponents';
import { motion, AnimatePresence } from "framer-motion";
import { StepIndicator, NavigationButtons, AddCarCard } from '../components/AddCarComponents';

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
      case 1: return formData.make;
      case 2: return formData.model;
      case 3: return formData.year && formData.mileage;
      case 4: return formData.transmission && formData.fuel_type && formData.color;
      case 5: return formData.price && formData.location && formData.contact_phone;
      case 6: return true; // Description and additional features are optional
      case 7: return formData.photos.length > 0 && formData.photos.length <= 15;
      default: return true;
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
      const photoBase64Strings = await Promise.all(formData.photos.map(photo => 
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(photo);
        })
      ));

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
      toast.error("Too many photos (maximum 15)");
      return false;
    }

    return true;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <FormSection title="Select Brand">
            <MakeSelect
              make={formData.make}
              onMakeChange={(value) => handleInputChange('make', value)}
              language={language}
            />
          </FormSection>
        );
      case 2:
        return (
          <FormSection title="Select Model">
            <ModelSelect
              make={formData.make}
              model={formData.model}
              onModelChange={(value) => handleInputChange('model', value)}
              language={language}
            />
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
      <AddCarCard title="Add Car for Sale">
        <StepIndicator currentStep={step} totalSteps={7} />
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
        <NavigationButtons
          step={step}
          totalSteps={7}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          language={language}
        />
      </AddCarCard>
    </div>
  );
};

export default AddCar;