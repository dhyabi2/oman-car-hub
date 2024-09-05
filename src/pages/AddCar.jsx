import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { addCar } from '../utils/indexedDB';
import { MakeModelSelect, MileageInput, PriceRangeInput, ColorSelector, FuelTypeSelector, TransmissionSelector, DoorsSelector, SeatsSelector, DrivetrainSelector, ConditionSelector } from '../components/CarFormFields';
import { FormSection, ListingDetails, AdditionalInformation, PhotoUpload } from './AddCarComponents';

const AddCar = ({ language = 'en', t }) => {
  const navigate = useNavigate();
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

  const validateForm = () => {
    const requiredFields = ['make', 'model', 'year', 'mileage', 'transmission', 'fuel_type', 'color', 'price', 'location', 'contact_phone'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error(`${t('pleaseAllRequiredFields')}: ${emptyFields.map(field => t(field)).join(', ')}`);
      return false;
    }

    if (!/^\d{8}$/.test(formData.contact_phone)) {
      toast.error(t('invalidPhoneNumber'));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await addCar(formData);
      toast.success(t('carListingAddedSuccess'));
      navigate('/cars-list');
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error(t('failedToAddCarListing'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('addCarForSale')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title={t('basicInformation')}>
              <MakeModelSelect
                make={formData.make}
                model={formData.model}
                onMakeChange={(value) => handleInputChange('make', value)}
                onModelChange={(value) => handleInputChange('model', value)}
                t={t}
              />
              <MileageInput
                value={formData.mileage}
                onChange={(value) => handleInputChange('mileage', value)}
                t={t}
              />
            </FormSection>

            <FormSection title={t('vehicleDetails')}>
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
              <DrivetrainSelector
                value={formData.drivetrain}
                onChange={(value) => handleInputChange('drivetrain', value)}
                t={t}
              />
              <ConditionSelector
                value={formData.condition}
                onChange={(value) => handleInputChange('condition', value)}
                t={t}
              />
            </FormSection>

            <ListingDetails
              formData={formData}
              handleInputChange={handleInputChange}
              t={t}
            />

            <AdditionalInformation
              formData={formData}
              handleInputChange={handleInputChange}
              t={t}
            />

            <PhotoUpload
              photos={formData.photos}
              handlePhotoUpload={(files) => handleInputChange('photos', files)}
              t={t}
            />

            <Button type="submit" className="w-full">{t('submitListing')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCar;