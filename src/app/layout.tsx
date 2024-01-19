import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '@/components/Provider'
// import { Toaster } from "@/components/ui/sonner"
import {Toaster} from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gho-Tip',
  description: 'Tipping application based on gho stablecoin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  )
}
