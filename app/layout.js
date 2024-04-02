import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'

import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coastal Zoom",
  description: "Video conference app for explore coastal",
  icons: {
    icon : "/icons/logo.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{
        layout : {
          logoImageUrl : "/icons/yoom-logo.svg",
          socialButtonsVariant: "iconButton"
        },
        variables : {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1c1f2e",
          colorInputBackground: "#252a41",
          colorInputText: "#fff"
        }
      }}>
      <body className={`${inter.className} bg-dark-2`}>
        {children}
        <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
