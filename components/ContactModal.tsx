import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { XMarkIcon } from './icons/XMarkIcon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Initialize EmailJS with public key
    emailjs.init('Ep2qCQe8P9Kw4z2gq');
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await emailjs.send(
        'service_ly36za6',
        'template_czse0fa',
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      );
      console.log('Email sent successfully:', response);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('EmailJS Error:', error);
      setErrorMessage(error.text || 'Failed to send message. Please try again.');
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-slate-800 rounded-lg shadow-2xl shadow-cyan-500/10 w-full max-w-lg p-6 md:p-8 relative ring-1 ring-slate-700 transform transition-transform duration-300 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-cyan-400 transition-colors"
          aria-label="Close contact form"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Thank You!</h3>
            <p className="text-slate-300">Your message has been sent successfully. I'll get back to you soon.</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-slate-200 mb-2">Let's Connect</h2>
            <p className="text-slate-400 mb-6">Send me a message and I'll get back to you as soon as possible.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 rounded-md border border-slate-700 text-slate-300 py-2 px-3 focus:ring-cyan-500 focus:border-cyan-500 transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 rounded-md border border-slate-700 text-slate-300 py-2 px-3 focus:ring-cyan-500 focus:border-cyan-500 transition"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 rounded-md border border-slate-700 text-slate-300 py-2 px-3 focus:ring-cyan-500 focus:border-cyan-500 transition"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-md shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:bg-cyan-600 transition-colors duration-300 disabled:bg-cyan-800 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : "Send Message"}
                </button>
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-400 mt-2">{errorMessage}</p>
              )}
            </form>
          </>
        )}
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};
