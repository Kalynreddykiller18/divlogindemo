'use client'

import { useAuth } from "./context/AuthContext"
import Link from 'next/link'

export default function HomePage(){
    const access = localStorage.getItem('accessToken')

    return(
        <>
            {access ? <div>Go to <Link href='/dashboard'>Dashboard</Link></div>:<li><Link href='/login' >Login</Link></li>}
        </>
    )
}