import './globals.css'

export const metadata = {
  title: 'RBI Softball',
  description: 'Softball Stats',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
