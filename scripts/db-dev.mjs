// Local Postgres for development and tests (docs/portfolio/16 §4). No account,
// no install: embedded-postgres runs a real Postgres 17 from node_modules, with
// data kept in /.embedded-pg (git-ignored). Production uses Neon instead.
//
//   pnpm db:dev            start (keep this terminal open)
//   pnpm db:dev --reset    wipe the local data first
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import EmbeddedPostgres from "embedded-postgres";

const dir = path.join(process.cwd(), ".embedded-pg");
const port = Number(process.env.LOCAL_PG_PORT ?? 5433);
const databases = ["portfolio", "portfolio_test"];

if (process.argv.includes("--reset") && existsSync(dir)) {
  rmSync(dir, { recursive: true, force: true });
  console.log("Local database wiped.");
}

const pg = new EmbeddedPostgres({
  databaseDir: dir,
  user: "postgres",
  // Local-only, not reachable from outside this machine.
  password: "postgres",
  port,
  persistent: true,
  // Windows defaults to WIN1252, which can't store "≤", "→" etc.
  initdbFlags: ["--encoding=UTF8", "--locale=C"],
});

const fresh = !existsSync(path.join(dir, "PG_VERSION"));
if (fresh) await pg.initialise();
await pg.start();
if (fresh) for (const db of databases) await pg.createDatabase(db);

console.log(
  `Local Postgres running on port ${port} (databases: ${databases.join(", ")}). Ctrl+C to stop.`,
);

const stop = async () => {
  await pg.stop();
  process.exit(0);
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
