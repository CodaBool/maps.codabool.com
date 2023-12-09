import { Toaster } from '@/components/ui/toaster'
// import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const metadata = {
  title: 'Maps in CyberSpace',
  description: 'A collection of maps ready to go for VTT',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Toaster />
        {children}
        <footer className="bottom-0 w-full p-8">
          <p className="text-center text-muted">Original art was made by <a href="http://travellerrpgblog.blogspot.com/">Robert Pearce</a> & packaged by <a href="http://gurpsland.no-ip.org/geomorphs/">Eric Smith</a>. Licensed under CC BY-NC 4.0</p>
        </footer>
      </body>
    </html>
  )
}
