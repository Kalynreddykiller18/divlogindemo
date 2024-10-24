import Link from 'next/link'

export default function Home(){
  return (
    <div>
    <h1>Welocome to DITS</h1>
    <li><Link href='/login' >Login</Link></li>
    </div>
  )
}