// app/layout.js
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({ children }) {
  return (
    // CRUCIAL: Both variables must be included with a space separating them
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
       <SmoothScroll>
         <ClientLayout>
           <PageTransition>
            {children}
           </PageTransition>
         </ClientLayout>
       </SmoothScroll>
      </body>
    </html>
  );
}