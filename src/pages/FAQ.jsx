import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { HelpCircle, Send, MessageCircle } from 'lucide-react';

const FAQ = ({ language, t }) => {
  const [feedback, setFeedback] = useState('');

  const faqData = [
    {
      question: t.howToListCar,
      answer: t.listCarInstructions
    },
    {
      question: t.isListingFree,
      answer: t.listingIsFree
    },
    {
      question: t.howToContactSeller,
      answer: t.contactSellerInstructions
    },
    {
      question: t.howToContactDeveloper,
      answer: t.contactDeveloperInstructions
    }
  ];

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", feedback);
    toast.success(t.feedbackThankYou);
    setFeedback('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2" />
            {t.frequentlyAskedQuestions}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                  {index === faqData.length - 1 && (
                    <Button
                      className="mt-2 bg-green-500 hover:bg-green-600"
                      onClick={() => window.open("https://wa.me/96896672579", "_blank")}
                    >
                      <MessageCircle className="mr-2" />
                      {t.contactViaWhatsApp}
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <HelpCircle className="mr-2" />
              {t.haveMoreQuestions}
            </h3>
            <Textarea
              placeholder={t.typeFeedbackOrQuestion}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleFeedbackSubmit} className="flex items-center">
              <Send className="mr-2" />
              {t.submitFeedback}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;