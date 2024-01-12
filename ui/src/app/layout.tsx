import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from "next-auth/react"
import getServerSession  from 'next-auth'
import { authConfig } from "@/auth.config"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Car power charging app',
  description: 'Implemented by JV',
}


export default function RootLayout({
  children, 
}: {
  children: React.ReactNode, 
}) {
  //const session = await getServerSession(authConfig);
  //onsole.log(session);

  return (
    <html lang="en">
      <body className={inter.className}>{children}
      </body>
    </html>
  )
}
