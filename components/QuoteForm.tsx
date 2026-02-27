import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, MessageCircle } from 'lucide-react';

type FormValues = {
  name: string;
  eventType: string;
  guests: string;
  contact: string;
  details: string;
};

const INITIAL_VALUES: FormValues = {
  name: '',
  eventType: '',
  guests: '',
  contact: '',
  details: '',
};

const QuoteForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!values.name.trim() || !values.eventType.trim() || !values.contact.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill your name, event type, and contact details.',
      });
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: 'error',
        message: 'Email service is not configured yet. Add EmailJS keys in .env.local.',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          event_type: values.eventType,
          guest_count: values.guests || 'Not specified',
          contact_info: values.contact,
          special_request: values.details || 'No additional request',
        },
        { publicKey }
      );

      setStatus({
        type: 'success',
        message: 'Your request has been sent successfully.',
      });
      setValues(INITIAL_VALUES);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote" className="py-32 bg-art-text text-white relative z-20 overflow-hidden rounded-t-[4rem] -mt-10 border-t-8 border-art-green">
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-20 h-20 bg-art-green rounded-full blur-[50px] pointer-events-none"></div>

      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-art-green text-art-text px-4 py-1 rounded-full font-bold font-quirky text-sm mb-4 transform -rotate-2">
            Let&apos;s make magic
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-4">
            Plan Your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-art-green to-art-gold">Masterpiece</span>
          </h2>
          <p className="text-white/50 text-xl font-sans">Fill in the blanks to start the conversation.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-16 rounded-[3rem] shadow-2xl relative">
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-art-gold rounded-full flex items-center justify-center border-4 border-art-text text-art-text">
            <MessageCircle size={24} />
          </div>

          <form onSubmit={handleSubmit} className="text-2xl md:text-4xl font-serif leading-relaxed text-white/90 space-y-2">
            <span>Hi Artistry! My name is </span>
            <div className="inline-block relative min-w-[200px] border-b-2 border-art-green mx-2">
              <input
                type="text"
                placeholder="your name"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-transparent outline-none text-center font-bold text-art-green placeholder:text-white/20 pb-2 focus:placeholder:opacity-0"
              />
            </div>
            <span> and I want to organize a </span>
            <div className="inline-block relative min-w-[250px] border-b-2 border-art-green mx-2 align-bottom">
              <label htmlFor="event-type-select" className="sr-only">
                Select event type
              </label>
              <select
                id="event-type-select"
                aria-label="Select event type"
                value={values.eventType}
                onChange={(e) => handleChange('eventType', e.target.value)}
                className="w-full bg-transparent outline-none text-center font-bold text-art-green pb-2 appearance-none cursor-pointer [&>option]:text-art-text"
              >
                <option value="" disabled>
                  select event
                </option>
                <option value="Kids Art Party">Kids Art Party</option>
                <option value="Resin Workshop">Resin Workshop</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Gift Hamper Order">Gift Hamper Order</option>
                <option value="Return Gifts Bulk">Return Gifts Bulk</option>
              </select>
            </div>
            <span> for roughly </span>
            <div className="inline-block relative min-w-[100px] border-b-2 border-art-green mx-2">
              <input
                type="number"
                placeholder="20"
                value={values.guests}
                onChange={(e) => handleChange('guests', e.target.value)}
                className="w-full bg-transparent outline-none text-center font-bold text-art-green placeholder:text-white/20 pb-2"
              />
            </div>
            <span> people. </span>
            <br className="hidden md:block" />
            <span className="mt-4 inline-block">You can reach me at </span>
            <div className="inline-block relative min-w-[300px] border-b-2 border-art-green mx-2">
              <input
                type="text"
                placeholder="email or phone"
                value={values.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
                className="w-full bg-transparent outline-none text-center font-bold text-art-green placeholder:text-white/20 pb-2"
              />
            </div>
            <span>. </span>
            <br className="hidden md:block" />
            <span className="mt-4 inline-block">One special request or detail is: </span>
            <div className="inline-block w-full border-b-2 border-art-green mt-2">
              <input
                type="text"
                placeholder="e.g. We love unicorns! / Need urgent delivery..."
                value={values.details}
                onChange={(e) => handleChange('details', e.target.value)}
                className="w-full bg-transparent outline-none text-left font-bold text-art-green placeholder:text-white/20 pb-2 italic"
              />
            </div>

            <div className="pt-12 flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer px-12 py-5 bg-white text-art-text rounded-full font-bold font-quirky text-xl hover:bg-art-green transition-all shadow-[0_0_40px_rgba(160,217,188,0.3)] hover:shadow-[0_0_60px_rgba(160,217,188,0.6)] hover:scale-105 flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send My Request'} <Send size={22} />
              </button>

              {status && (
                <p
                  className={`text-sm font-sans font-bold ${
                    status.type === 'success' ? 'text-art-green' : 'text-red-300'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
