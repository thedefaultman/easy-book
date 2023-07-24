import ModalProvider from "@/providers/ModalProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyBook",
  description: "Next level appointment booking software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <ModalProvider />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
