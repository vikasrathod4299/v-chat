import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 pt-7 antialiased font-light",
        inter.className
      )}
    >
      <AuthProvider>
        <body className={"min-h-screen bg-slate-50 antialiased"}>
          <div className="max-w-7xl mx-auto h-full">{children}</div>
        </body>
      </AuthProvider>
    </html>
  );
}
