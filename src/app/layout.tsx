import ModalProvider from "@/providers/ModalProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";

const raleway = Raleway({
  subsets: ["latin-ext", "cyrillic-ext", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <body className={raleway.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <ModalProvider />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
