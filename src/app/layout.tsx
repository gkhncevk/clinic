import type { Metadata } from "next"
import { Inter, Source_Serif_4 } from "next/font/google"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { TopNav } from "@/components/nav/top-nav"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
})

export const metadata: Metadata = {
  title: "ynsocial | Health Tourism Marketplace",
  description:
    "Verified clinic listings and ambassador referral tools for the ynsocial health tourism marketplace.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sourceSerif.variable} font-sans`}>
        <ThemeProvider>
          <TooltipProvider delayDuration={200}>
            <TopNav />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
