import { Metadata } from "next";
import CryptoPresalesBlockDAG from "@/components/CryptoPresalesBlockDAG";

export const metadata: Metadata = {
  title:
    "Blockdag News: Investors Rotate Into DeepSnitch AI For A Rare 100x Opportunity as Coinbase Launches New Tools | CoinTrends News",
  description:
    "Latest BlockDAG news may indicate a delayed launch, leading traders to flock to DeepSnitch AI, which raised over $429K and increased by over 26% in record time.",
  keywords:
    "BlockDAG, DeepSnitch AI, DSNT, crypto presales, best crypto presales 2025, Coinbase, crypto investment, 100x opportunity",
  openGraph: {
    title: "Blockdag News: Investors Rotate Into DeepSnitch AI For A Rare 100x Opportunity",
    description:
      "Latest BlockDAG news may indicate a delayed launch, leading traders to flock to DeepSnitch AI, which raised over $429K and increased by over 26% in record time.",
    type: "article",
    images: [
      {
        url: "/images/articles/investors-deepsnitchai.jpg",
        width: 1200,
        height: 630,
        alt: "BlockDAG News: Investors Rotate Into DeepSnitch AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blockdag News: Investors Rotate Into DeepSnitch AI For A Rare 100x Opportunity",
    description:
      "Latest BlockDAG news may indicate a delayed launch, leading traders to flock to DeepSnitch AI.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: "Blockdag News: Investors Rotate Into DeepSnitch AI For A Rare 100x Opportunity as Coinbase Launches New Tools",
    description:
      "Latest BlockDAG news may indicate a delayed launch, leading traders to flock to DeepSnitch AI, which raised over $429K and increased by over 26% in record time.",
    datePublished: "2025-10-17",
    dateModified: "2025-10-17",
    author: {
      "@type": "Person",
      name: "Antoine Marin",
    },
    publisher: {
      "@type": "Organization",
      name: "Coin Trends News",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CryptoPresalesBlockDAG />
    </>
  );
}
