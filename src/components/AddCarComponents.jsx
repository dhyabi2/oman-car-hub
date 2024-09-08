import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';

export const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-1/7 h-2 ${
            i < currentStep ? 'bg-primary' : 'bg-gray-200'
          } transition-all duration-300`}
        />
      ))}
    </div>
  </div>
);

export const NavigationButtons = ({ step, totalSteps, handlePrevious, handleNext, handleSubmit, isSubmitting, language }) => (
  <CardFooter className={`flex ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'} justify-between`}>
    {step > 1 && (
      <Button onClick={handlePrevious} variant="outline" disabled={isSubmitting}>
        {language === 'ar' ? (
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
    {step < totalSteps ? (
      <Button onClick={handleNext} className={language === 'ar' ? 'mr-auto' : 'ml-auto'} disabled={isSubmitting}>
        {language === 'ar' ? (
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
      <Button onClick={handleSubmit} className={language === 'ar' ? 'mr-auto' : 'ml-auto'} disabled={isSubmitting}>
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
);

export const AddCarCard = ({ children, title }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);