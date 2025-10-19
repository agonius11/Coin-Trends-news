import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Article } from "@/types";

const articlesDirectory = path.join(process.cwd(), "content/articles");

// Create directory if it doesn't exist
if (!fs.existsSync(articlesDirectory)) {
  fs.mkdirSync(articlesDirectory, { recursive: true });
}

// Special landing page article - appears as a card but links to special page
const specialLandingPageArticle: Article = {
  id: "special-presales-2025",
  title: "5 Best Crypto Presales to Buy Now — One Is Still Early",
  slug: "best-crypto-presales-2025",
  excerpt:
    "Missed $PEPE, $WIF, or $JEET when they were under the radar? Each of these coins launched through a presale, pumped hard, and made early backers rich. But today, only one of them is still in presale — and it's turning heads fast.",
  content: "", // Not used for this special page
  author: "Antoine Marin",
  publishedAt: "2025-07-16",
  updatedAt: "2025-07-16",
  category: "Presales",
  image: "/images/articles/crypto-presales.jpg",
  featured: true,
  isSpecialPage: true, // This flags it as a special page
};

// German special landing page article
const specialLandingPageArticleDE: Article = {
  id: "special-presales-2025-de",
  title:
    "Die 5 besten Krypto-Presales, die du jetzt kaufen kannst (einer ist noch in einer sehr frühen Phase)",
  slug: "beste-krypto-presales-2025",
  excerpt:
    "In den Jahren 2023 und 2024 kamen Coins wie $PEPE, $WIF und $VIRTUAL nahezu ohne Aufsehen auf den Markt und machten frühe Käufer teilweise über Nacht zu Millionären. 2025 könnte DeepSnitch ($DSNT) deine nächste Chance auf 100x-Gewinne sein.",
  content: "", // Not used for this special page
  author: "Antoine Marin",
  publishedAt: "2025-08-19",
  updatedAt: "2025-07-19",
  category: "Presales",
  image: "/images/articles/crypto-presales.jpg",
  featured: true,
  isSpecialPage: true, // This flags it as a special page
};

// BlockDAG special landing page article
const specialLandingPageArticleBlockDAG: Article = {
  id: "special-presales-blockdag-2025",
  title:
    "Blockdag News: Investors Rotate Into DeepSnitch AI For A Rare 100x Opportunity as Coinbase Launches New Tools",
  slug: "best-crypto-presales-blokdag-2025",
  excerpt:
    "Latest BlockDAG news may indicate a delayed launch, leading traders to flock to DeepSnitch AI, which raised over $429K and increased by over 26% in record time.",
  content: "", // Not used for this special page
  author: "Antoine Marin",
  publishedAt: "2025-10-17",
  updatedAt: "2025-10-17",
  category: "Presales",
  image: "/images/articles/crypto-presales.jpg",
  featured: true,
  isSpecialPage: true, // This flags it as a special page
};

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Check if it's the special article first
  if (slug === "best-crypto-presales-2025") {
    return specialLandingPageArticle;
  }

  // Check if it's the German special article
  if (slug === "beste-krypto-presales-2025") {
    return specialLandingPageArticleDE;
  }

  // Check if it's the BlockDAG special article
  if (slug === "best-crypto-presales-blokdag-2025") {
    return specialLandingPageArticleBlockDAG;
  }

  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);

    const contentHtml = processedContent.toString();

    return {
      id: slug,
      slug,
      content: contentHtml,
      title: data.title,
      excerpt: data.excerpt,
      image: data.image,
      author: data.author,
      category: data.category,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt || data.publishedAt,
      featured: data.featured || false,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export async function getAllArticleSlugs(): Promise<string[]> {
  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    const markdownSlugs = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => fileName.replace(/\.md$/, ""));

    // Add the special article slugs
    return [
      "best-crypto-presales-2025",
      "beste-krypto-presales-2025",
      "best-crypto-presales-blokdag-2025",
      ...markdownSlugs,
    ];
  } catch (error) {
    console.error("Error reading articles directory:", error);
    return [
      "best-crypto-presales-2025",
      "beste-krypto-presales-2025",
      "best-crypto-presales-blokdag-2025",
    ]; // Still return special articles even if directory read fails
  }
}

export async function getLatestArticles(
  limit: number = 10
): Promise<Article[]> {
  const slugs = await getAllArticleSlugs();
  const articles = await Promise.all(
    slugs.map((slug) => getArticleBySlug(slug))
  );

  const validArticles = articles.filter(
    (article): article is Article => article !== null
  );

  // Sort by date with special article always first
  const sortedArticles = validArticles.sort((a, b) => {
    // Special article always comes first
    if (a.isSpecialPage && !b.isSpecialPage) return -1;
    if (!a.isSpecialPage && b.isSpecialPage) return 1;

    // Then sort by date
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  return sortedArticles.slice(0, limit);
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const articles = await getLatestArticles(20);
  return articles.find((article) => article.featured) || articles[0] || null;
}

export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const articles = await getLatestArticles(100);
  return articles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
}
