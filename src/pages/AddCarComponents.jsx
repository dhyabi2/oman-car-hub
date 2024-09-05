import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { locations } from '../utils/carData';

export const FormSection = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

export const ListingDetails = ({ formData, handleInputChange, t }) => (
  <FormSection title={t('listingDetails')}>
    <div>
      <Label htmlFor="price">{t('price')} (OMR)</Label>
      <Input
        id="price"
        type="number"
        value={formData.price}
        onChange={(e) => handleInputChange('price', Number(e.target.value))}
      />
    </div>
    <div>
      <Label htmlFor="location">{t('location')}</Label>
      <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
        <SelectTrigger>
          <SelectValue placeholder={t('selectLocation')} />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location} value={location}>{location}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="contact_phone">{t('contactPhone')}</Label>
      <Input
        id="contact_phone"
        type="tel"
        value={formData.contact_phone}
        onChange={(e) => handleInputChange('contact_phone', e.target.value)}
        placeholder="8 digits"
      />
    </div>
  </FormSection>
);

export const AdditionalInformation = ({ formData, handleInputChange, t }) => (
  <FormSection title={t('additionalInformation')}>
    <div>
      <Label htmlFor="description">{t('description')}</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        rows={4}
      />
    </div>
    <div>
      <Label htmlFor="additional_features">{t('additionalFeatures')}</Label>
      <Textarea
        id="additional_features"
        value={formData.additional_features}
        onChange={(e) => handleInputChange('additional_features', e.target.value)}
        rows={4}
      />
    </div>
  </FormSection>
);

export const PhotoUpload = ({ photos, handlePhotoUpload, t }) => (
  <FormSection title={t('photos')}>
    <div>
      <Label htmlFor="photos">{t('uploadPhotos')}</Label>
      <Input
        id="photos"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handlePhotoUpload(Array.from(e.target.files))}
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
);