import React, { useState } from 'react';
import axios from '../../services/axios'; 
import './ApplicationForm.css';

const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    employmentType: '',
    income: '',
    loanType: '',
    loanAmount: '',
    loanTenure: '',
    loanPurpose: '',
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/loan/apply', formData); 
      console.log('Application submitted:', response.data);
      alert('Application submitted successfully!');

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
        employmentType: '',
        income: '',
        loanType: '',
        loanAmount: '',
        loanTenure: '',
        loanPurpose: '',
        agreeToTerms: false,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application.');
    }
  };

  return (
    <div className="application-form-container">
      <h2>Apply for a Loan</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="employmentType" placeholder="Employment Type" value={formData.employmentType} onChange={handleChange} required />
        <input type="number" name="income" placeholder="Annual Income" value={formData.income} onChange={handleChange} required />
        <input type="text" name="loanType" placeholder="Loan Type" value={formData.loanType} onChange={handleChange} required />
        <input type="number" name="loanAmount" placeholder="Loan Amount" value={formData.loanAmount} onChange={handleChange} required />
        <input type="number" name="loanTenure" placeholder="Loan Tenure (Months)" value={formData.loanTenure} onChange={handleChange} required />
        <textarea name="loanPurpose" placeholder="Purpose of Loan" value={formData.loanPurpose} onChange={handleChange} required />
        <label className="agree-checkbox">
          <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} required />
          I agree to the terms and conditions.
        </label>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
