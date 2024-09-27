import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { HelpCircle, Send, MessageCircle } from 'lucide-react';

const API_BASE_URL = 'https://oman-car-hub.replit.app';

const FAQ = ({ language, t }) => {
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

  const handleFeedbackSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/submit-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      toast.success(language === 'ar' ? 'شكرًا على ملاحظاتك!' : 'Thank you for your feedback!');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error(language === 'ar' ? 'فشل في إرسال الملاحظات' : 'Failed to submit feedback');
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '96896672579';
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.location.href = whatsappUrl;
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
                <AccordionTrigger className={language === 'ar' ? 'text-right text-lg font-bold' : 'font-bold'}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={language === 'ar' ? 'text-right' : ''}>
                  {faq.answer}
                  {index === faqData.length - 1 && (
                    <Button
                      className="mt-2 bg-green-500 hover:bg-green-600"
                      onClick={handleWhatsAppClick}
                    >
                      <MessageCircle className="mr-2" />
                      {language === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className={`mt-8 ${language === 'ar' ? 'text-right' : ''}`}>
            <h3 className={`text-lg font-semibold mb-2 flex items-center ${language === 'ar' ? 'justify-end' : ''}`}>
              {language === 'ar' ? (
                <>
                  هل لديك المزيد من الأسئلة؟
                  <HelpCircle className="ml-2" />
                </>
              ) : (
                <>
                  <HelpCircle className="mr-2" />
                  Have more questions?
                </>
              )}
            </h3>
            <Textarea
              placeholder={language === 'ar' ? 'اكتب ملاحظاتك أو سؤالك هنا...' : 'Type your feedback or question here...'}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-4"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
            <div className={`flex ${language === 'ar' ? 'justify-start' : 'justify-end'}`}>
              <Button onClick={handleFeedbackSubmit} className="flex items-center">
                {language === 'ar' ? (
                  <>
                    إرسال الملاحظات
                    <Send className="mr-2" />
                  </>
                ) : (
                  <>
                    <Send className="mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;
