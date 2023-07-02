import './globals.css'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'kort.ar',
  description: 'Crea, acorta y centraliza tus links en un solo lugar!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={openSans.className}>{children}</body>
    </html>
  )
}
