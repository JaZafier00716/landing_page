// robots.txt rules: everyone is allowed, AI-training / LLM crawlers are not. Googlebot, Bingbot etc. fall under "*".
export const aiCrawlers = [
  "GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-Web", "anthropic-ai", "CCBot", "Google-Extended",
  "Applebot-Extended", "PerplexityBot", "Bytespider", "Meta-ExternalAgent", "Amazonbot", "cohere-ai", "Diffbot", "omgili",
];

export function buildRobots(siteUrl: string) {
  return {
    rules: [{ userAgent: "*", allow: "/" }, { userAgent: aiCrawlers, disallow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
