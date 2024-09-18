import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdditionalInformationForm = ({ formData, handleInputChange, t, language }) => {
  return (
    <div className={`space-y-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div>
        <Label htmlFor="description">{t.description}</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="additional_features">{t.additionalFeatures}</Label>
        <Textarea
          id="additional_features"
          value={formData.additional_features}
          onChange={(e) => handleInputChange('additional_features', e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
};

export default AdditionalInformationForm;
