import React, { forwardRef } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { locations } from '../utils/carData';

export const FormSection = forwardRef(({ title, children }, ref) => (
  <div ref={ref}>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
));

export const ListingDetails = forwardRef(({ formData, handleInputChange, t }, ref) => {
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    handleInputChange('contact_phone', value);
  };

  return (
    <FormSection title={t.listingDetails} ref={ref}>
      <div>
        <Label htmlFor="price">{t.price} (OMR)</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => handleInputChange('price', Number(e.target.value))}
          placeholder={t.enterPrice}
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
              <SelectItem key={location} value={location}>{t[location.toLowerCase()] || location}</SelectItem>
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
});

export const AdditionalInformation = forwardRef(({ formData, handleInputChange, t }, ref) => (
  <FormSection title={t.additionalInformation} ref={ref}>
    <div>
      <Label htmlFor="description">{t.description} ({t.optional})</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        rows={4}
        placeholder={t.descriptionPlaceholder}
      />
    </div>
    <div>
      <Label htmlFor="additional_features">{t.additionalFeatures} ({t.optional})</Label>
      <Textarea
        id="additional_features"
        value={formData.additional_features}
        onChange={(e) => handleInputChange('additional_features', e.target.value)}
        rows={4}
        placeholder={t.additionalFeaturesPlaceholder}
      />
    </div>
  </FormSection>
));

export const PhotoUpload = forwardRef(({ photos, handlePhotoUpload, t, maxPhotos }, ref) => (
  <FormSection title={t.photos} ref={ref}>
    <div>
      <Label htmlFor="photos">{t.uploadPhotos} (Max {maxPhotos})</Label>
      <Input
        id="photos"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files);
          const totalPhotos = photos.length + selectedFiles.length;
          if (totalPhotos <= maxPhotos) {
            handlePhotoUpload([...photos, ...selectedFiles]);
          } else {
            alert(`You can only upload a maximum of ${maxPhotos} photos.`);
          }
        }}
      />
    </div>
    {photos.length > 0 && (
      <div className="grid grid-cols-3 gap-4 mt-4">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={URL.createObjectURL(photo)}
            alt={`Car photo ${index + 1}`}
            className="w-full h-32 object-cover rounded"
          />
        ))}
      </div>
    )}
  </FormSection>
));

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