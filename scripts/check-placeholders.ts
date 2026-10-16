// Lists every stand-in image still in the CMS (docs/portfolio/09 §6): Media
// documents with "placeholder" ticked.
//
//   pnpm check:placeholders            report only
//   LAUNCH=1 pnpm check:placeholders   exit 1 if any remain (14 §1)
import config from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config });
const { docs } = await payload.find({
  collection: "media",
  where: { placeholder: { equals: true } },
  limit: 1000,
  depth: 0,
  sort: "filename",
});

if (docs.length === 0) {
  console.log("No placeholders left.");
  process.exit(0);
}
console.log(
  `${docs.length} placeholder image(s), marked in /dashboard → Media:\n`,
);
for (const m of docs) console.log(`${m.filename}  ${m.alt}`);
if (process.env.LAUNCH === "1") {
  console.error("\nLaunch blocked: replace every placeholder first (14 §1).");
  process.exit(1);
}
process.exit(0);
