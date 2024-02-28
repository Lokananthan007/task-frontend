
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    dob: '',
    password: '',
    gender: '',
    city: '',
    profileImage: '',
    agreeTerms: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profileImage: imageFile,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const formDataWithImage = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataWithImage.append(key, value);
        });

        console.log("FormData:", formDataWithImage);

        const response = await axios.post('http://localhost:4455/user', formDataWithImage, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          console.log('Form submitted successfully');
          alert('Form submitted successfully');
          setFormData({
            name: '',
            mobile: '',
            email: '',
            dob: '',
            password: '',
            gender: '',
            city: '',
            profileImage: '',
            agreeTerms: false,
          });
        } else {
          console.error('Form submission failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error during form submission:', error.message);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!data.mobile.trim()) {
      errors.mobile = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(data.mobile)) {
      errors.mobile = 'Invalid Mobile Number';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid Email';
    }

    if (!data.dob.trim()) {
      errors.dob = 'Date of Birth is required';
    }

    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }

    if (!data.gender) {
      errors.gender = 'Gender is required';
    }

    if (!data.city) {
      errors.city = 'City is required';
    }

    if (!data.agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms and conditions';
    }

    return errors;
  };

  return (
    <div id="form">
      <form onSubmit={handleSubmit}>
        <label className="label">Name:</label><br />
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        {formErrors.name && <span className="error">{formErrors.name}</span>}
        <br/>

        <label className="label">Mobile Number:</label><br />
        <input type="number" name="mobile" value={formData.mobile} onChange={handleInputChange} />
        {formErrors.mobile && <span className="error">{formErrors.mobile}</span>}
        <br/>

        <label className="label">Email Id:</label><br />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        {formErrors.email && <span className="error">{formErrors.email}</span>}
        <br/>

        <label className="label">Date of Birth:</label><br />
        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
        {formErrors.dob && <span className="error">{formErrors.dob}</span>}
        <br/>

        <label className="label">Password:</label><br />
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        {formErrors.password && <span className="error">{formErrors.password}</span>}
        <br/>

        <label className="label">Gender:<br />
          <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleInputChange} /> Male<br />
          <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleInputChange} /> Female<br />
        </label>
        {formErrors.gender && <span className="error">{formErrors.gender}</span>}
        <br/>

        <label className="label">City:</label>
        <select name="city" value={formData.city} onChange={handleInputChange}>
          <option value="">Select City</option>
          <option value="Chennai">Chennai</option>
          <option value="Tiruppur">Tiruppur</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Erode">Erode</option>
          <option value="Madurai">Madurai</option>
        </select>
        {formErrors.city && <span className="error">{formErrors.city}</span>}
        <br/>
        <label className="label">Profile Image:</label><br />
        <input type="file" name="profileImage" onChange={handleImageChange} />
        <br/>

        <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleInputChange} /> I agree to the terms and conditions <br/>
        {formErrors.agreeTerms && <span className="error">{formErrors.agreeTerms}</span>}
        <br/>

        <button type="submit">Submit</button>
      </form>
    </div> 
  );
}

export default App;
