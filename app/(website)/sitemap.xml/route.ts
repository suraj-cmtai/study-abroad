import { NextResponse } from "next/server";

const BASE_URL = "https://www.studyabroadind.com";

const staticRoutes = [
  "/",
  "/blogs",
  "/courses",
  "/gallery",
  "/appointment",
  "/contact",
];

// If you want to add dynamic routes (e.g., for blog posts), you would fetch them here.

export async function GET() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Build the XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (route) => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.7"}</priority>
  </url>`
  )
  .join("")}
  <url>
    <loc>https://test.studyabroadind.com</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
