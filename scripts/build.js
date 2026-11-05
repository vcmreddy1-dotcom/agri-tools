const { execSync } = require("child_process");

// Auto-sanitize DATABASE_URL in case it was pasted with surrounding quotes or whitespace in Vercel
if (process.env.DATABASE_URL) {
  let url = process.env.DATABASE_URL.trim();

  // Strip surrounding quotes
  if (
    (url.startsWith('"') && url.endsWith('"')) ||
    (url.startsWith("'") && url.endsWith("'"))
  ) {
    url = url.slice(1, -1).trim();
  }

  // Strip accidental trailing text like "1. Connection string"
  url = url.replace(/1\.\s*Connection\s*string.*$/i, "").trim();

  process.env.DATABASE_URL = url;
}

try {
  execSync("prisma generate && next build --webpack", {
    stdio: "inherit",
    env: process.env,
  });
} catch (error) {
  process.exit(error.status || 1);
}
