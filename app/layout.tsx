import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "config/material-tailwind-theme-provider";
import ReactQueryClientProvider from "config/ReactQueryClientProvider";
import Header from "components/header";
import Footer from "components/footer";
import RecoilProvider from "config/RecoilProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// font-awesome: 다양한 아이콘들을 간단한 클래스명으로 import 해주는 라이브러리

export default function RootLayout({ children }) {
  return (
    <RecoilProvider>
      <ReactQueryClientProvider>
        <ThemeProvider>
          {/* @ts-ignore */}
          <html lang="en">
            <head>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
                integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </head>
            <body className={inter.className}>
              <Header />
              {children}
              <Footer />
            </body>
          </html>
        </ThemeProvider>
      </ReactQueryClientProvider>
    </RecoilProvider>
  );
}
