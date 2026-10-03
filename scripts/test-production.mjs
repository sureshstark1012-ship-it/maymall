import { spawnSync } from "node:child_process";

// Every build and server receives explicit settings; owner/CI ambient values cannot leak in.
const preview = { ...process.env, SITE_URL: "", SITE_INDEXABLE: "false" };
delete preview.NO_COLOR; // Playwright sets FORCE_COLOR; avoid conflicting terminal flags.
function run(command, args, env) {
  const result = spawnSync(command, args, { stdio: "inherit", env });
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(`${command} ${args.join(" ")} failed (${result.status})`);
}
try {
  run("node", ["--test", "tests/site-config.test.mjs"], preview);
  run("npm", ["run", "test:content"], preview);
  for (const scenario of [
    {
      name: "preview",
      env: preview,
      config: "playwright.production.config.ts",
    },
    {
      name: "configured-preview",
      env: { ...preview, SITE_URL: "https://deployment.example" },
      config: "playwright.seo.config.ts",
    },
    {
      name: "indexable",
      env: {
        ...preview,
        SITE_URL: "https://deployment.example",
        SITE_INDEXABLE: "true",
      },
      config: "playwright.seo.config.ts",
    },
  ]) {
    console.log(`\nProduction test scenario: ${scenario.name}`);
    run("npm", ["run", "build"], scenario.env);
    run(
      "npx",
      ["--no-install", "playwright", "test", "--config=" + scenario.config],
      scenario.env,
    );
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  // Never leave a deployable build advertising the reserved test-fixture domain.
  console.log("\nRestoring the safe, unconfigured preview build.");
  try {
    run("npm", ["run", "build"], preview);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
