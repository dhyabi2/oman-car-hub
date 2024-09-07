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
      question: language === 'ar' ? 'كيف أقوم بإدراج سيارتي للبيع؟' : 'How do I list my car for sale?',
      answer: language === 'ar' ? 'لإدراج سيارتك، انتقل إلى صفحة "إضافة سيارة" من القائمة الرئيسية. املأ المعلومات المطلوبة عن سيارتك، وقم بتحميل الصور، وأرسل القائمة.' : 'To list your car, go to the "Add Car" page from the main menu. Fill out the required information about your car, upload photos, and submit the listing.'
    },
    {
      question: language === 'ar' ? 'هل إدراج سيارتي مجاني؟' : 'Is listing my car free?',
      answer: language === 'ar' ? 'نعم، إدراج سيارتك على سوق عمان للسيارات مجاني تمامًا. نحن لا نفرض أي رسوم على نشر قائمة سيارتك.' : 'Yes, listing your car on Oman Auto Mart is completely free. We do not charge any fees for posting your car listing.'
    },
    {
      question: language === 'ar' ? 'كيف يمكنني الاتصال بالبائع؟' : 'How can I contact a seller?',
      answer: language === 'ar' ? 'في كل قائمة سيارة، ستجد معلومات الاتصال بالبائع. يمكنك عادةً الاتصال بهم عبر الهاتف أو واتساب.' : 'On each car listing, you will find contact information for the seller. You can usually contact them via phone or WhatsApp.'
    },
    {
      question: language === 'ar' ? 'كيف يمكنني الاتصال بالمطور؟' : 'How can I contact the developer?',
      answer: language === 'ar' ? 'إذا كنت بحاجة إلى التواصل مع المطور بخصوص مشاكل تقنية أو اقتراحات، يمكنك استخدام زر واتساب أدناه.' : 'If you need to reach out to the developer for technical issues or suggestions, you can use the WhatsApp button below.'
    }
  ];

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", feedback);
    toast.success(language === 'ar' ? 'شكرًا على ملاحظاتك!' : 'Thank you for your feedback!');
    setFeedback('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2" />
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
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
                      {language === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <HelpCircle className="mr-2" />
              {language === 'ar' ? 'هل لديك المزيد من الأسئلة؟' : 'Have more questions?'}
            </h3>
            <Textarea
              placeholder={language === 'ar' ? 'اكتب ملاحظاتك أو سؤالك هنا...' : 'Type your feedback or question here...'}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleFeedbackSubmit} className="flex items-center">
              <Send className="mr-2" />
              {language === 'ar' ? 'إرسال الملاحظات' : 'Submit Feedback'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;