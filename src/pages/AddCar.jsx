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
import { CarFormFields } from '../components/CarFormFields';
import ImageSelector from '../components/ImageSelector';
import { locations } from '../utils/carData';

const AddCar = ({ language = 'en' }) => {
  const navigate = useNavigate();
  const t = (key) => translations[language][key] || key;
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    transmission: '',
    fuel_type: '',
    color: '',
    price: '',
    location: '',
    contact_phone: '+968',
    vin: '',
    seller_type: 'Private',
    listing_expiration_date: null,
    description: '',
    additional_features: '',
    photos: [],
  });

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
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
            <CarFormFields formData={formData} handleInputChange={handleInputChange} t={t} />
            <ListingDetails formData={formData} handleInputChange={handleInputChange} t={t} language={language} />
            <AdditionalInformation formData={formData} handleInputChange={handleInputChange} t={t} />
            <PhotoUpload photos={formData.photos} handlePhotoUpload={handlePhotoUpload} t={t} />
            <Button type="submit" className="w-full">{t('submitListing')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const ListingDetails = ({ formData, handleInputChange, t, language }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">{t('listingDetails')}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="price">{t('price')} (OMR)</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => handleInputChange('price', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="vin">{t('vinOptional')}</Label>
        <Input
          id="vin"
          value={formData.vin}
          onChange={(e) => handleInputChange('vin', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="location">{t('location')}</Label>
        <select
          id="location"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">{t('selectLocation')}</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {t(location.toLowerCase())}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="seller_type">{t('sellerType')}</Label>
        <select
          id="seller_type"
          value={formData.seller_type}
          onChange={(e) => handleInputChange('seller_type', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Private">{t('private')}</option>
          <option value="Dealer">{t('dealer')}</option>
        </select>
      </div>
      <div>
        <Label htmlFor="contact_phone">{t('contactPhone')}</Label>
        <Input
          id="contact_phone"
          type="tel"
          value={formData.contact_phone}
          onChange={(e) => handleInputChange('contact_phone', e.target.value)}
          placeholder="+968 xxxxxxxx"
        />
      </div>
      <DatePickerField
        label={t('listingExpirationDate')}
        value={formData.listing_expiration_date}
        onChange={(date) => handleInputChange('listing_expiration_date', date ? date.toISOString() : null)}
        t={t}
      />
    </div>
  </div>
);

const AdditionalInformation = ({ formData, handleInputChange, t }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">{t('additionalInformation')}</h2>
    <div className="space-y-4">
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
    </div>
  </div>
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