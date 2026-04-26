import './globals.css'
import InitialLoader from '@/components/InitialLoader';

export const metadata = {
  metadataBase: new URL('https://romissaree.com'),
  title: {
    default: "Romi's - সাজিয়েছি এক নতুন পসরা | Authentic Bengali Sarees",
    template: "%s | Romi's Saree"
  },
  description: "Curating the finest hand-woven Bengali sarees. Every thread tells a story of heritage and craftsmanship. সাজিয়েছি এক নতুন পসরা",
  keywords: ['saree', 'Bengali saree', 'Jamdani', 'Baluchari', 'handwoven', 'authentic saree', "Romi's saree", "Romi's boutique", 'luxury ethnic wear', 'traditional saree', 'সাজিয়েছি এক নতুন পসরা'],
  openGraph: {
    title: "Romi's - সাজিয়েছি এক নতুন পসরা",
    description: "Curating the finest hand-woven Bengali sarees. Every thread tells a story of heritage and craftsmanship.",
    url: 'https://romissaree.com',
    siteName: "Romi's Saree",
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2BWsi_c7CqNkS6Epd98Yg1I44oraVV_vY3mifJYQ_f836M0xEKcmqPznKdwD40YR0YAA8YNjzsTBBTTWXnJ97_mZ2Ucpnc57-zvr6SPE9NeDa1EFJawid-ZFgQr4dwXgf6PaRq1b8h5i1s5Y4eT8kUXTHCUuAoPSPQiZRdN71feYaawYdSufuWxAzHib9JWapUhVz_f99U-iFdxgjhogb5Im8jNBltqydJf5nPEji5fmNR0_PleC-bVAPG4YfQ0Qvbdja9FoFKg',
        width: 1200,
        height: 630,
        alt: 'Romi\'s Authentic Bengali Sarees',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Romi's - সাজিয়েছি এক নতুন পসরা",
    description: "Curating the finest hand-woven Bengali sarees.",
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuA2BWsi_c7CqNkS6Epd98Yg1I44oraVV_vY3mifJYQ_f836M0xEKcmqPznKdwD40YR0YAA8YNjzsTBBTTWXnJ97_mZ2Ucpnc57-zvr6SPE9NeDa1EFJawid-ZFgQr4dwXgf6PaRq1b8h5i1s5Y4eT8kUXTHCUuAoPSPQiZRdN71feYaawYdSufuWxAzHib9JWapUhVz_f99U-iFdxgjhogb5Im8jNBltqydJf5nPEji5fmNR0_PleC-bVAPG4YfQ0Qvbdja9FoFKg'],
  },
  alternates: {
    canonical: 'https://romissaree.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta
          name="google-site-verification"
          content="Eor3fYDm1K5sxA9wS8S_Ha_sdwTQpd86QCfP4WK765M"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: 'Outfit, sans-serif', background: '#faf7ff', color: '#1a0030' }}>
        {children}
      </body>
    </html>
  )
}
