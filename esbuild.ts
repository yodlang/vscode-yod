// SPDX-FileCopyrightText: 2025 Milesime <213074881+milesime@users.noreply.github.com>
//
// SPDX-License-Identifier: GPL-3.0-only

import { context } from "esbuild";

const production = process.argv.includes("--production");

async function main() {
  const ctx = await context({
    entryPoints: ["src/extension.ts"],
    bundle: true,
    format: "cjs",
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: "node",
    outfile: "dist/extension.js",
    external: ["vscode"],
  });

  await ctx.rebuild();
  await ctx.dispose();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
