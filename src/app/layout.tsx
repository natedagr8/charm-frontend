import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Iridescence from '../components/Iridescence';
import Header from '../components/Header';


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
    icon: '/favicon.jpg', 
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
      >
        <div id="outer-container">
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
        </div>
      </body>
    </html>
  );
}
