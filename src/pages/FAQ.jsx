import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const faqData = [
  {
    question: "How do I list my car for sale?",
    answer: "To list your car, go to the 'Add Car' page from the navigation menu. Fill out the form with your car's details, upload photos, and submit the listing."
  },
  {
    question: "Is it free to list my car?",
    answer: "Yes, listing your car on Oman Auto Mart is completely free."
  },
  {
    question: "How long will my listing stay active?",
    answer: "Your listing will remain active for 30 days. You can renew or remove it at any time from your account dashboard."
  },
  {
    question: "Can I edit my listing after it's posted?",
    answer: "Yes, you can edit your listing at any time. Simply log in to your account and go to your active listings to make changes."
  },
  {
    question: "How do I contact a seller?",
    answer: "Each listing has a 'Contact Seller' button. Click it to reveal the seller's contact information or to send them a message through our platform."
  }
];

const FAQ = () => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = () => {
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedback);
    toast.success("Thank you for your feedback!");
    setFeedback('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
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
            <h3 className="text-lg font-semibold mb-2">Have more questions?</h3>
            <Textarea
              placeholder="Type your feedback or question here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;