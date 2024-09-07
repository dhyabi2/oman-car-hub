import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { HelpCircle, Send, MessageCircle } from 'lucide-react';

const FAQ = ({ language }) => {
  const [feedback, setFeedback] = useState('');

  const faqData = [
    {
      question: 'How do I list my car for sale?',
      answer: 'To list your car, go to the "Add Car" page from the main menu. Fill out the required information about your car, upload photos, and submit the listing.'
    },
    {
      question: 'Is listing my car free?',
      answer: 'Yes, listing your car on Oman Auto Mart is completely free. We do not charge any fees for posting your car listing.'
    },
    {
      question: 'How can I contact a seller?',
      answer: 'On each car listing, you will find contact information for the seller. You can usually contact them via phone or WhatsApp.'
    },
    {
      question: 'How can I contact the developer?',
      answer: 'If you need to reach out to the developer for technical issues or suggestions, you can use the WhatsApp button below.'
    }
  ];

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", feedback);
    toast.success('Thank you for your feedback!');
    setFeedback('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2" />
            Frequently Asked Questions
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
                      Contact via WhatsApp
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <HelpCircle className="mr-2" />
              Have more questions?
            </h3>
            <Textarea
              placeholder="Type your feedback or question here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleFeedbackSubmit} className="flex items-center">
              <Send className="mr-2" />
              Submit Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;