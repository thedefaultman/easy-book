import ModalProvider from "@/providers/ModalProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";

const roboto = Roboto({
  subsets: ["latin-ext", "cyrillic-ext", "greek-ext", "greek", "cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
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
      <body className={roboto.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <ModalProvider />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
