import { Inter, Lexend } from "next/font/google"
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"
import clsx from "clsx"

import "@/styles/globals.scss"
import { type Metadata } from "next"
import Script from "next/script"

import { Providers } from "./providers"
import "@polkadot/api-augment/kusama"
import "@polkadot/api-augment/polkadot"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: {
    template: "Polkadot Hungary Community egyszerű Polkadot stake-elés",
    default: "Polkadot Hungary Community egyszerű Polkadot stake-elés",
  },
  description: "Egyszerű Polkadot nominálás és stake-elés",
}

const inter = Inter({
  subsets: ["latin"],
  // display: "swap",
  variable: "--font-inter",
})

const lexend = Lexend({
  subsets: ["latin"],
  // display: "swap",
  variable: "--font-lexend",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        "h-full scroll-smooth bg-white antialiased",
        inter.variable,
        lexend.variable
      )}
    >
      <body className="flex h-full flex-col">
        <Providers>{children}</Providers>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FNKNFVZVCN" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FNKNFVZVCN');
        `}
        </Script>
      </body>
      <Toaster />
    </html>
  )
}
