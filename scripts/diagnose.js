#!/usr/bin/env node

/**
 * FitTrack AI - Setup Diagnostic Script
 * Verifies all configurations are correct before running the app
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

const icons = {
  check: "✓",
  cross: "✗",
  warning: "⚠",
  info: "ℹ",
};

function log(color, icon, message) {
  console.log(`${colors[color]}${icon} ${message}${colors.reset}`);
}

function section(title) {
  console.log(`\n${colors.cyan}━━━ ${title} ━━━${colors.reset}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    log("green", icons.check, `${description}`);
  } else {
    log("red", icons.cross, `${description} - NOT FOUND`);
  }
  return exists;
}

function checkEnv() {
  const envPath = path.join(__dirname, ".env.local");
  if (!fs.existsSync(envPath)) {
    log("yellow", icons.warning, ".env.local not found - using .env.example");
    return false;
  }

  const envContent = fs.readFileSync(envPath, "utf-8");
  const requiredVars = [
    "DATABASE_URL",
    "NEXTAUTH_URL",
    "NEXTAUTH_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "OPENAI_API_KEY",
    "STRIPE_SECRET_KEY",
  ];

  const missing = requiredVars.filter((v) => !envContent.includes(v));

  if (missing.length > 0) {
    log(
      "red",
      icons.cross,
      `Missing env vars: ${missing.join(", ")}`
    );
    return false;
  }

  const incomplete = requiredVars.filter((v) => {
    const match = envContent.match(new RegExp(`${v}="([^"]+)"`));
    return match && match[1].includes("your-");
  });

  if (incomplete.length > 0) {
    log(
      "yellow",
      icons.warning,
      `Incomplete env vars (contain 'your-'): ${incomplete.join(", ")}`
    );
    return false;
  }

  log("green", icons.check, "All environment variables configured");
  return true;
}

function checkNodeModules() {
  const nodeModulesPath = path.join(__dirname, "node_modules");
  if (fs.existsSync(nodeModulesPath)) {
    log("green", icons.check, "node_modules installed");
    return true;
  } else {
    log("red", icons.cross, "node_modules not found - run 'npm install'");
    return false;
  }
}

function checkPrisma() {
  const prismaPath = path.join(__dirname, "node_modules/.prisma/client/index.js");
  if (fs.existsSync(prismaPath)) {
    log("green", icons.check, "Prisma Client generated");
    return true;
  } else {
    log(
      "yellow",
      icons.warning,
      "Prisma Client not generated - run 'npm run db:generate'"
    );
    return false;
  }
}

function checkTypeScript() {
  try {
    execSync("npx tsc --noEmit", {
      cwd: __dirname,
      stdio: "pipe",
    });
    log("green", icons.check, "TypeScript compilation successful");
    return true;
  } catch (error) {
    const output = error.stdout?.toString() + error.stderr?.toString();
    const errorCount = (output.match(/error TS\d+/g) || []).length;
    if (errorCount > 0) {
      log("red", icons.cross, `${errorCount} TypeScript errors found`);
      console.log(output.split("\n").slice(0, 20).join("\n"));
      return false;
    }
    return true;
  }
}

function checkDatabaseConnection() {
  try {
    execSync("npx prisma db execute --stdin < /dev/null", {
      cwd: __dirname,
      stdio: "pipe",
      env: { ...process.env },
    });
    log("green", icons.check, "Database connection successful");
    return true;
  } catch {
    log(
      "red",
      icons.cross,
      "Database connection failed - check DATABASE_URL in .env.local"
    );
    return false;
  }
}

function main() {
  console.log(
    `${colors.blue}
╔═══════════════════════════════════════════╗
║     FitTrack AI - Setup Diagnostic       ║
╚═══════════════════════════════════════════╝
${colors.reset}`
  );

  const checks = [];

  // Files
  section("Configuration Files");
  checks.push(checkFile(path.join(__dirname, "tsconfig.json"), "tsconfig.json"));
  checks.push(checkFile(path.join(__dirname, "next.config.js"), "next.config.js"));
  checks.push(checkFile(path.join(__dirname, "package.json"), "package.json"));
  checks.push(checkFile(path.join(__dirname, "tailwind.config.ts"), "tailwind.config.ts"));
  checks.push(checkFile(path.join(__dirname, "prisma/schema.prisma"), "prisma/schema.prisma"));

  // Src structure
  section("Source Structure");
  checks.push(checkFile(path.join(__dirname, "src/app/layout.tsx"), "src/app/layout.tsx"));
  checks.push(checkFile(path.join(__dirname, "src/app/page.tsx"), "src/app/page.tsx"));
  checks.push(checkFile(path.join(__dirname, "src/components/ui/button.tsx"), "src/components/ui/button.tsx"));
  checks.push(checkFile(path.join(__dirname, "src/lib/auth.ts"), "src/lib/auth.ts"));

  // Dependencies
  section("Dependencies");
  checks.push(checkNodeModules());
  checks.push(checkPrisma());

  // Configuration
  section("Configuration");
  checks.push(checkEnv());

  // Compilation
  section("Type Safety");
  checks.push(checkTypeScript());

  // Database (optional - might not be running)
  section("Database (Optional)");
  try {
    checkDatabaseConnection();
  } catch {
    log("yellow", icons.info, "Database check skipped (database may not be running yet)");
  }

  // Summary
  const passCount = checks.filter((c) => c).length;
  const totalCount = checks.filter((c) => c !== null).length;
  const percentage = Math.round((passCount / totalCount) * 100);

  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  if (percentage === 100) {
    log("green", icons.check, `All checks passed (${passCount}/${totalCount})`);
    console.log(`\n${colors.green}✓ Ready to start:  npm run dev${colors.reset}\n`);
  } else {
    log(
      percentage >= 75 ? "yellow" : "red",
      icons.warning,
      `${passCount}/${totalCount} checks passed (${percentage}%)`
    );
    console.log(`\n${colors.yellow}⚠ Fix issues above before running the app ${colors.reset}\n`);
  }
}

main();
