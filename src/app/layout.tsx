import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import NavBar from '@/components/Navbar';
import Providers from './providers';

export const metadata: Metadata = {
  title: "UH Class Notes",
  description: "Briefly describe this project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="wrapper">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
