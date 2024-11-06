import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./component/Navbar/navbar";

const geistSans = localFont({
  src: "/fonts/GeistVF.woff", // Update the path if needed
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff", // Update the path if needed
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "NoteSpace",
  description: "A dedicated space for your notes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
