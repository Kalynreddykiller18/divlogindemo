'use client'

import { useRouter } from 'next/navigation'; 
import { useAuth } from "./context/AuthContext"
import Link from 'next/link';

export default function Navigation() {
    const { user, logout } = useAuth(); 
    const router = useRouter(); 

    const handleLogout = () => {
        logout(); 
        router.push('/login'); 
    }

    return (
        <nav className="navigation">
            <span><Link href='/dashboard'>BITS</Link></span>
            {user ? (
                <button onClick={handleLogout}>LOGOUT</button>
            ) : (
                <button onClick={() => router.push('/login')}>LOGIN</button>
            )}
        </nav>
    );
}
