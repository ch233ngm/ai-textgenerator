'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('Contact.form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
const [showAlert, setShowAlert] = useState(false);
const [alertType, setAlertType] = useState('success');

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL_CONTACT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        projectIdentifier: process.env.NEXT_PUBLIC_PROJECT_IDENTIFIER
      }),
    });

    if (response.ok) {
      setFormData({ name: '', email: '', message: '' });
      setAlertType('success');
      setShowAlert(true);
    } else {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    setAlertType('error');
    setShowAlert(true);
  }
  setTimeout(() => setShowAlert(false), 5000); // Hide alert after 5 seconds
};

return (
  <>
    {showAlert && (
      <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-error'} mb-4`}>
        {alertType === 'success' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        )}
        <span>{alertType === 'success' ? t('submitSuccess') : t('submitError')}</span>
      </div>
    )}
    <form onSubmit={handleSubmit} className="max-w-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">{t('name')}</label>
        <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block mb-2">
        {t('email')} <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-required="true"
      />
      <p className="text-sm text-gray-500 mt-1">{t('emailRequired')}</p>
    </div>
    <div className="mb-4">
      <label htmlFor="message" className="block mb-2">{t('message')}</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md"
        rows="4"
      ></textarea>
    </div>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
      {t('submit')}
    </button>
      </form>
  </>
  );
}