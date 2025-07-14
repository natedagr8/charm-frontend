import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Iridescence from '../components/Iridescence';
import Header from '../components/Header';
import Footer from '../components/Footer';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charmski!",
  description: "A platform for sharing and discovering memories through digital charms.",
  icons: {
    icon: '/logo.png', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <div id="outer-container" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="fixed inset-0 -z-10">
            <Iridescence
              color={[.7,1,1]}
              mouseReact={false}
              amplitude={0.1}
              speed={.6}
            />
          </div>
          <Header />
          <main id="page-wrap" className="pt-13">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
