#!/usr/bin/env tsx

import { Command } from "commander";
import { initCommand } from "./commands/init.js";

/**
 * BenchCMS CLI - Management script for BenchCMS operations
 */

const program = new Command();

program
  .name("benchcms")
  .description("BenchCMS management CLI")
  .version("1.0.0");

// Register the init command
program
  .command("init")
  .description(initCommand.description)
  .action(async () => {
    try {
      await initCommand.execute([]);
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse(process.argv);
