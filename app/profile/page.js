'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';


export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <>
          <h2>Name: {user.name}</h2>
          <h3>Mobile No: {user.mobile_no}</h3> 
          <h3>WhatsApp No: {user.whatsapp_no}</h3>
          <h4>{user.email && user.email}</h4> 
          <button><Link href='/updateprofile'>Update Profile</Link></button>
        </>
      ) : (
        <p>You are not logged in <Link href='/login'>Go to Login </Link></p>
      )}
    </div>
  );
}
