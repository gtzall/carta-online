import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Carta para o Meu Amor',
  description: 'Uma carta de amor digital',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
