import { copyFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import ora from "ora";
import chalk from "chalk";
import { join } from "path";
import { randomBytes } from "crypto";
import type { Command } from "./types.js";

const PAYLOAD_SECRET_KEY = "PAYLOAD_SECRET";
const SECRET_LENGTH = 32; // 32 bytes = 64 hex chars

/**
 * Generates a random secure secret
 */
const generateSecret = (): string => {
  return randomBytes(SECRET_LENGTH).toString("hex");
};

/**
 * Handles the creation of the .env file from .env.example
 */
const ensureEnvFile = (rootDir: string): boolean => {
  const envExamplePath = join(rootDir, ".env.example");
  const envPath = join(rootDir, ".env");

  if (!existsSync(envExamplePath)) {
    console.error(
      chalk.red("❌ Error: .env.example file not found in the root directory."),
    );
    return false;
  }

  if (existsSync(envPath)) {
    console.log(
      chalk.yellow(
        "⚠  .env file already exists, preserving existing configuration",
      ),
    );
    return true;
  }

  const spinner = ora("Creating .env file from .env.example...").start();
  try {
    copyFileSync(envExamplePath, envPath);
    spinner.succeed(chalk.green("Created .env file"));
    return true;
  } catch (error) {
    spinner.fail(chalk.red("Failed to create .env file"));
    throw error;
  }
};

/**
 * Ensures PAYLOAD_SECRET is set in the .env file
 */
const ensurePayloadSecret = (rootDir: string): void => {
  const envPath = join(rootDir, ".env");
  let envContent = readFileSync(envPath, "utf-8");

  // Regex to find commented or empty PAYLOAD_SECRET
  // Matches: # PAYLOAD_SECRET=... or PAYLOAD_SECRET= (empty)
  const commentedSecretRegex = /^#\s*PAYLOAD_SECRET=.*$/m;
  const emptySecretRegex = /^PAYLOAD_SECRET=$/m;

  if (
    commentedSecretRegex.test(envContent) ||
    emptySecretRegex.test(envContent)
  ) {
    const spinner = ora("Generating secure PAYLOAD_SECRET...").start();
    const secret = generateSecret();
    const replacement = `${PAYLOAD_SECRET_KEY}=${secret}`;

    if (commentedSecretRegex.test(envContent)) {
      envContent = envContent.replace(commentedSecretRegex, replacement);
    } else {
      envContent = envContent.replace(emptySecretRegex, replacement);
    }

    writeFileSync(envPath, envContent, "utf-8");
    spinner.succeed(chalk.green("Generated PAYLOAD_SECRET"));
  } else {
    console.log(chalk.blue("ℹ  PAYLOAD_SECRET is already configured"));
  }
};

/**
 * Internal initialization logic
 */
export const runInit = async (): Promise<void> => {
  const rootDir = process.cwd();

  console.log(chalk.bold.cyan("\n🚀 BenchCMS Initialization\n"));

  if (!ensureEnvFile(rootDir)) {
    return;
  }

  try {
    ensurePayloadSecret(rootDir);
    console.log(
      chalk.bold.green("\n✨ Initialization complete! You are ready to go.\n"),
    );
  } catch (error) {
    console.error(chalk.red("\n❌ Initialization failed with an error:"));
    console.error(error);
    process.exit(1);
  }
};

/**
 * Init command - Initialize the project environment
 */
export const initCommand: Command = {
  description:
    "Initialize the project environment (.env file with PAYLOAD_SECRET)",
  execute: async () => {
    await runInit();
  },
};
