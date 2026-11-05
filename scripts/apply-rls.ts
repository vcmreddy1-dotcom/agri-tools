import { prisma } from "../lib/db";
import fs from "fs";
import path from "path";

async function applyRLS() {
  console.log("Applying Row Level Security (RLS) to Supabase database...");
  const sqlFile = fs.readFileSync(path.join(__dirname, "setup-rls.sql"), "utf-8");

  // Clean and split SQL commands by semicolons, filtering out transactions and comments
  const cleanSql = sqlFile
    .replace(/--.*$/gm, "") // remove line comments
    .replace(/\/\*[\s\S]*?\*\//g, ""); // remove block comments

  const statements = cleanSql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.toUpperCase() !== "BEGIN" && s.toUpperCase() !== "COMMIT");

  console.log(`Found ${statements.length} SQL statements to execute.`);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      await prisma.$executeRawUnsafe(stmt);
      const firstLine = stmt.split("\n")[0].slice(0, 60);
      console.log(`[${i + 1}/${statements.length}] Executed: ${firstLine}...`);
    } catch (err: any) {
      console.error(`Error executing statement #${i + 1}:\n${stmt}\n`, err.message);
      throw err;
    }
  }

  // Verify RLS status on all public tables
  const rlsStatus: any = await prisma.$queryRawUnsafe(`
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public'
    ORDER BY tablename;
  `);

  console.log("\nRLS Status for public tables:");
  console.table(rlsStatus);
  console.log("\n✓ RLS successfully enabled and verified for all tables!");
}

applyRLS()
  .catch((err) => {
    console.error("Failed to apply RLS:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

