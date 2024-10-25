'use client'; 

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const UpdateProfile = () => {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    mobile_no: '',
    whatsapp_no: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        mobile_no: user.mobile_no,
        whatsapp_no: user.whatsapp_no
      });
    }

    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.put('https://api.aroundme.co.in/businessapp/BusinessOwner/edit/', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      updateUser(formData);
      alert('Profile updated successfully!');
      router.push('/profile'); 
    } catch (err) {
      console.error(err);
      setError('Failed to update profile: ' + err.response?.data?.detail || 'Unauthorized');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            User Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mobile No:
            <input
              type="tel"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            WhatsApp No:
            <input
              type="tel"
              name="whatsapp_no"
              value={formData.whatsapp_no}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
