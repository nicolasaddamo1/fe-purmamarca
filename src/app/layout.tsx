import type { Metadata } from "next";
import { ABeeZee } from "next/font/google";
import AntdProvider from "./antdProvider";
import "./globals.css";
import ToastProvider from "@/components/Toast/ToastProvider";

const abeezee = ABeeZee({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abeezee",
});

export const metadata: Metadata = {
  title: "Purmamarca",
  description: "E-commerce de productos de artesanía",
  icons: {
    icon: "/purm.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${abeezee.variable} antialiased`}>
        <AntdProvider>
          <ToastProvider />
          {children}
        </AntdProvider>
      </body>
    </html>
  );
}
