import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import NextAuthSessionProvider from "@/components/SessionProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NextAuthSessionProvider>
          <Navbar />
          <main className="flex-grow">{children}

          </main>
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
