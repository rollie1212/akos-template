import type { Metadata } from "next";
import "./globals.css";
import CareerChat from "@/components/CareerChat";

export const metadata: Metadata = {
  title: "My AKOS Portfolio",
  description: "A structured career portfolio powered by AKOS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <CareerChat />
      </body>
    </html>
  );
}
