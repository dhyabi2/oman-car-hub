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
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { addCar } from '../utils/indexedDB';
import { translations } from '../utils/translations';
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

const AddCar = ({ language = 'en' }) => {
  const navigate = useNavigate();
  const t = (key) => translations[language][key] || key;
  const [formData, setFormData] = useState({
    // ... (keep the existing formData state)
    contact_phone: '',
  });

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await addCar({ ...formData, contact_phone: `+968${formData.contact_phone}` });
      toast.success(t('carListingAddedSuccess'));
      navigate('/cars-list');
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error(t('failedToAddCarListing'));
    }
  };

  const validateForm = () => {
    const requiredFields = ['make', 'model', 'year', 'mileage', 'transmission', 'fuel_type', 'color', 'price', 'location', 'contact_phone'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error(`${t('pleaseAllRequiredFields')}: ${emptyFields.map(field => t(field)).join(', ')}`);
      return false;
    }
    return true;
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    Promise.all(files.map(file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }))).then(results => {
      setFormData(prevState => ({ ...prevState, photos: results }));
    }).catch(error => {
      console.error('Error processing images:', error);
      toast.error(t('errorUploadingImages'));
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('addCarForSale')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <BasicInformation formData={formData} handleInputChange={handleInputChange} t={t} />
            <VehicleDetails formData={formData} handleInputChange={handleInputChange} t={t} />
            <ListingDetails formData={formData} handleInputChange={handleInputChange} t={t} />
            <AdditionalInformation formData={formData} handleInputChange={handleInputChange} t={t} />
            <PhotoUpload photos={formData.photos} handlePhotoUpload={handlePhotoUpload} t={t} />
            <Button type="submit" className="w-full">{t('submitListing')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const BasicInformation = ({ formData, handleInputChange, t }) => (
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
);

const VehicleDetails = ({ formData, handleInputChange, t }) => (
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
);

const ListingDetails = ({ formData, handleInputChange, t }) => (
  <FormSection title={t('listingDetails')}>
    <PriceRangeInput
      minPrice={formData.price}
      maxPrice={formData.price}
      onChange={(field, value) => handleInputChange('price', value)}
      t={t}
    />
    <div>
      <Label htmlFor="vin">{t('vinOptional')}</Label>
      <Input
        id="vin"
        value={formData.vin}
        onChange={(e) => handleInputChange('vin', e.target.value)}
      />
    </div>
    <ImageSelector
      label={t('location')}
      options={translations[language].locations.map(location => ({ value: location, icon: null, label: t(location.toLowerCase()) }))}
      value={formData.location}
      onChange={(value) => handleInputChange('location', value)}
    />
    <ImageSelector
      label={t('sellerType')}
      options={[
        { value: 'Private', icon: null, label: t('private') },
        { value: 'Dealer', icon: null, label: t('dealer') }
      ]}
      value={formData.seller_type}
      onChange={(value) => handleInputChange('seller_type', value)}
    />
    <div>
      <Label htmlFor="contact_phone">{t('contactPhone')}</Label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
          +968
        </span>
        <Input
          id="contact_phone"
          type="tel"
          value={formData.contact_phone}
          onChange={(e) => handleInputChange('contact_phone', e.target.value)}
          className="rounded-l-none"
        />
      </div>
    </div>
    <DatePickerField
      label={t('listingExpirationDate')}
      value={formData.listing_expiration_date}
      onChange={(date) => handleInputChange('listing_expiration_date', date ? date.toISOString() : null)}
      t={t}
    />
  </FormSection>
);

const AdditionalInformation = ({ formData, handleInputChange, t }) => (
  <FormSection title={t('additionalInformation')}>
    <div>
      <Label htmlFor="description">{t('descriptionOptional')}</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
      />
    </div>
    <div>
      <Label htmlFor="additional_features">{t('additionalFeaturesOptional')}</Label>
      <Textarea
        id="additional_features"
        value={formData.additional_features}
        onChange={(e) => handleInputChange('additional_features', e.target.value)}
      />
    </div>
  </FormSection>
);

const PhotoUpload = ({ photos, handlePhotoUpload, t }) => (
  <div>
    <Label htmlFor="photos">{t('photosMax10')}</Label>
    <Input id="photos" type="file" multiple onChange={handlePhotoUpload} accept="image/*" />
    {photos.length > 0 && (
      <div className="mt-2">
        <p>{photos.length} {t('filesSelected')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-2">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`${t('uploadedCar')} ${index + 1}`} className="w-full h-24 object-cover rounded" />
          ))}
        </div>
      </div>
    )}
  </div>
);

const FormSection = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

const DatePickerField = ({ label, value, onChange, t }) => (
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
          {value ? format(new Date(value), "PPP") : <span>{t('pickDate')}</span>}
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