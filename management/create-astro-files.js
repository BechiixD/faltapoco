import { pages } from "../src/data/pages.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pagesDir = join(__dirname, "..", "src", "pages");

async function createAstroFiles() {
    let created = 0;
    let skipped = 0;
    let errors = 0;

    console.log("Starting to check and create .astro files...\n");

    for (const [key, page] of Object.entries(pages)) {
        const slug = page.meta.slug;
        const astroFileName = `${slug}.astro`;
        const astroFilePath = join(pagesDir, astroFileName);

        try {
            // Check if file already exists
            try {
                await fs.access(astroFilePath);
                console.log(`✓ ${astroFileName} already exists, skipping...`);
                skipped++;
                continue;
            } catch {
                // File doesn't exist, create it
            }

            // Generate the .astro file content
            const astroContent = `---
import Counter from "../Layouts/Counter.astro";
import { pages } from "../data/pages.js";
const { date, meta, content } = pages.${key};
---

<Counter date={date} meta={meta} content={content} />
`;

            // Write the .astro file
            await fs.writeFile(astroFilePath, astroContent, "utf-8");
            console.log(`✓ Created ${astroFileName}`);
            created++;
        } catch (error) {
            console.error(`✗ Error processing ${key} (${astroFileName}):`, error.message);
            errors++;
        }
    }

    console.log(`\n--- Summary ---`);
    console.log(`Created: ${created}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Errors: ${errors}`);
}

createAstroFiles().catch(console.error);

