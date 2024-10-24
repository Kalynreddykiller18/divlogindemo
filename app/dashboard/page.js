'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { user } = useAuth(); 
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://ditscrm.divsolution.com/task-Api');
      const result = await response.json();
      setData(result.data || []);
    };
    fetchData();
  }, []);

  const lowercasedFilter = searchQuery.toLowerCase();
  const filteredData = data.filter(item => 
    item.fullName?.toLowerCase().includes(lowercasedFilter) ||
    item.phoneNumber?.includes(lowercasedFilter) ||
    item.email?.toLowerCase().includes(lowercasedFilter) ||
    item.adId?.toString().includes(lowercasedFilter) ||
    (item.campanName ? item.campanName.toLowerCase() : '').includes(lowercasedFilter) ||
    item.postCode?.toString().includes(lowercasedFilter)
  );

  return (
    <div style={{width:'80%'}}>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <h2>Welcome, {user.name}</h2>
          <button>
            <Link href='/profile'>View Profile</Link>
          </button>
          <br />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Ad ID</th>
                <th>Campaign Name</th>
                <th>Post Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  <td>{item.fullName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.email}</td>
                  <td>{item.adId}</td>
                  <td>{item.campanName}</td>
                  <td>{item.postCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>You are not logged in <button><Link href='/login'>Go to Login</Link></button></p>
      )}
    </div>
  );
}
