import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BJJ Dojo Manager | Simplify dojo operations",
  description:
    "A lightweight, staff-first dojo management tool for Brazilian Jiu-Jitsu gyms: attendance, timetable, members, and payments — in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
