import clsx from "clsx";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import AuthProvider from "@/hooks/useAuth";
import SocketProvider from "@/hooks/useSocket";

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
    <html lang="en">
      <AuthProvider>
        <Provider>
          <SocketProvider>
            <body className={clsx(inter.className, "h-screen")}>
              {children}
            </body>
          </SocketProvider>
        </Provider>
      </AuthProvider>
    </html>
  );
}
