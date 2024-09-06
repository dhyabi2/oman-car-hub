import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { carMakes, carModels, locations, fuelTypes, transmissionTypes } from '../utils/carData';
import { getNestedTranslation } from '../utils/translations';

// ... other existing imports and components ...

export const ListingDetails = ({ formData, handleInputChange, t }) => {
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    handleInputChange('contact_phone', value);
  };

  return (
    <FormSection title={t.listingDetails}>
      <div>
        <Label htmlFor="price">{t.price} (OMR)</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => handleInputChange('price', Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="location">{t.location}</Label>
        <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t.selectLocation} />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {getNestedTranslation(t, location.toLowerCase()) || location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="contact_phone">{t.contactPhone}</Label>
        <Input
          id="contact_phone"
          type="tel"
          value={formData.contact_phone}
          onChange={handlePhoneChange}
          pattern="[0-9]*"
          maxLength={8}
          placeholder={t.phoneNumberPlaceholder}
        />
      </div>
    </FormSection>
  );
};

// ... other existing components ...

export const MakeModelSelect = ({ make, model, onMakeChange, onModelChange, t }) => (
  <>
    <div>
      <Label htmlFor="make">{t.make}</Label>
      <Select value={make} onValueChange={onMakeChange}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectMake} />
        </SelectTrigger>
        <SelectContent>
          {carMakes.map((brand) => (
            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="model">{t.model}</Label>
      <Select value={model} onValueChange={onModelChange} disabled={!make}>
        <SelectTrigger>
          <SelectValue placeholder={t.selectModel} />
        </SelectTrigger>
        <SelectContent>
          {make && carModels[make]?.map((model) => (
            <SelectItem key={model} value={model}>{model}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </>
);

export const TransmissionSelector = ({ value, onChange, t }) => (
  <div>
    <Label htmlFor="transmission">{t.transmission}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={t.selectTransmission} />
      </SelectTrigger>
      <SelectContent>
        {transmissionTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {getNestedTranslation(t, type.toLowerCase()) || type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export const FuelTypeSelector = ({ value, onChange, t }) => (
  <div>
    <Label htmlFor="fuelType">{t.fuelType}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={t.selectFuelType} />
      </SelectTrigger>
      <SelectContent>
        {fuelTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {getNestedTranslation(t, type.toLowerCase()) || type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// ... other existing components ...