import { pages } from "../src/data/pages.js";
import { writeFileSync } from "fs";
import { join } from "path";

const outputPath = join(process.cwd(), "public/pages.json");

writeFileSync(outputPath, JSON.stringify(pages, null, 2));

console.log("pages.json generado");
