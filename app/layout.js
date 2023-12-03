import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SeonghaCosmos',
  description: 'Welcome to my world',
}

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>

  )
}
