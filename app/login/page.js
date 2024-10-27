'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const {user} = useAuth()
  
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    const body = {
      username: name,
      password: pass,
    };

    try {
      const res = await axios.post('https://api.aroundme.co.in/login/businesslogin/', body);
      const result = res.data;
      

      login(result);
      router.push('/dashboard');
    } catch (err) {
      console.log(err.message);
      setError('Incorrect User details');
    }
  };

  return (
    user ? <h3>you are already logged in</h3> :
    <form>
      <input
        placeholder="Username"
        onChange={(e) => setName(e.target.value)}
        type="text"
        required
      />
      <input
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
        type="password"
        required
      />
      <input type="button" onClick={handleLogin} value="LOGIN" />
      {error && <h3>{error}</h3>}
    </form>
  );
}
