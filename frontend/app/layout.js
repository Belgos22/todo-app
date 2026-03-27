import './globals.css'

export const metadata = {
  title: 'Todo App',
  description: 'Mon application de tâches full-stack',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}