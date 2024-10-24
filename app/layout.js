import Link from "next/link"
import { AuthProvider } from "./context/AuthContext"
import Navigation from "./navigation"
import './globals.css'

export const metadata = {
  title: 'DITS',
  description: 'Developed by Kalyan',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <AuthProvider >
          <Navigation />
          <div className="container">
          {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
