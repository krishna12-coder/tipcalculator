const fs = require("fs");
const path = require("path");

// Set the base URL of your website
const baseUrl = "https://tipcalculator.net";

// Define your pages
const pages = [
  {
    loc: "/",
    changefreq: "weekly",
    priority: "1.0",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    loc: "/faq",
    changefreq: "weekly",
    priority: "0.8",
    lastmod: new Date().toISOString().split("T")[0],
  },
  // Add more pages dynamically as needed
];

// Generate the sitemap content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>
`;

// Save sitemap to the public directory
const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
fs.writeFile(sitemapPath, sitemapContent, (err) => {
  if (err) {
    console.error("Error writing sitemap:", err);
  } else {
    console.log(`Sitemap successfully generated at ${sitemapPath}`);
  }
});
