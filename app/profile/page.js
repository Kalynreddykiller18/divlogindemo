'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';


export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{color:"red",fontSize:"1.89rem",margin:"10px 0"}}>Profile Page</h1>
      {user ? (
        <div className='profile'>
          <div className='profli'><span>Name</span> <span>{user.name}</span></div>
          <div className='profli'><span>Mobile No</span> <span>{user.mobile_no}</span></div>
          <div className='profli'><span>WhatsApp No</span> <span>{user.whatsapp_no }</span></div>
          <div className='profli'>Email <span>{user.email ? user.email : <>Mail id not exits</>}</span></div>
          <button><Link href='/updateprofile'>Update Profile</Link></button>
        </div>
      ) : (
        <p>You are not logged in <Link href='/login'>Go to Login </Link></p>
      )}
    </div>
  );
}
