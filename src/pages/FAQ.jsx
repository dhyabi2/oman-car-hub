import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const FAQ = ({ t }) => {
  const [feedback, setFeedback] = useState('');

  const faqData = [
    {
      question: t('howToListCar'),
      answer: t('listCarAnswer')
    },
    {
      question: t('isListingFree'),
      answer: t('listingFreeAnswer')
    },
    {
      question: t('howLongListingActive'),
      answer: t('listingActiveAnswer')
    },
    {
      question: t('canEditListing'),
      answer: t('editListingAnswer')
    },
    {
      question: t('howToContactSeller'),
      answer: t('contactSellerAnswer')
    }
  ];

  const handleFeedbackSubmit = () => {
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedback);
    toast.success(t('feedbackThankYou'));
    setFeedback('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('frequentlyAskedQuestions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">{t('haveMoreQuestions')}</h3>
            <Textarea
              placeholder={t('typeFeedbackOrQuestion')}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleFeedbackSubmit}>{t('submitFeedback')}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;