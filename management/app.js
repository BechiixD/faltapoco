import express from "express";
import {pages} from "../src/data/pages.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pagesFilePath = join(__dirname, "..", "src", "data", "pages.js");

const app = express();

app.use(express.json());

// Serve static files from the management directory
app.use(express.static(__dirname));

// Serve index.html at the root
app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

app.get("/api/pages", (req, res) => {
    res.json(pages);
});

app.post("/api/pages", async (req, res) => {
    try {
        const { key, date, meta, content } = req.body;
        
        if (!key || !date || !meta || !content) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        // Read the current pages.js file
        const fileContent = await fs.readFile(pagesFilePath, "utf-8");
        
        // Parse the existing pages object
        const currentPages = { ...pages };
        
        // Check if key already exists
        if (currentPages[key]) {
            return res.status(400).json({ message: `Page with key "${key}" already exists` });
        }
        
        // Add the new page
        currentPages[key] = {
            date,
            meta,
            content
        };
        
        // Generate the new file content
        let newFileContent = "export const pages = {\n";
        
        for (const [pageKey, page] of Object.entries(currentPages)) {
            newFileContent += `    ${pageKey}: {\n`;
            
            // Special handling for anoNuevo dynamic date
            if (pageKey === "anoNuevo") {
                newFileContent += "        date: { targetIso: `${new Date().getUTCFullYear() + 1}-01-01T00:00:00Z` },\n";
            } else {
                newFileContent += `        date: { targetIso: ${JSON.stringify(page.date.targetIso)} },\n`;
            }
            
            newFileContent += `        meta: {\n`;
            newFileContent += `            pageTitle: ${JSON.stringify(page.meta.pageTitle)},\n`;
            newFileContent += `            description: ${JSON.stringify(page.meta.description)},\n`;
            newFileContent += `            keywords: ${JSON.stringify(page.meta.keywords)},\n`;
            newFileContent += `            url: ${JSON.stringify(page.meta.url)},\n`;
            newFileContent += `            slug: ${JSON.stringify(page.meta.slug)},\n`;
            newFileContent += `            image: ${JSON.stringify(page.meta.image)},\n`;
            newFileContent += `        },\n`;
            newFileContent += `        content: {\n`;
            newFileContent += `            title: ${JSON.stringify(page.content.title)},\n`;
            newFileContent += `            connector: ${JSON.stringify(page.content.connector)},\n`;
            newFileContent += `            whatWhen: ${JSON.stringify(page.content.whatWhen)},\n`;
            newFileContent += `            timeLeft: ${JSON.stringify(page.content.timeLeft)},\n`;
            newFileContent += `            info: [${page.content.info.map(item => JSON.stringify(item)).join(", ")}],\n`;
            newFileContent += `        }\n`;
            newFileContent += `    },\n`;
        }
        
        newFileContent += "}\n";
        
        // Write the updated content back to the file
        await fs.writeFile(pagesFilePath, newFileContent, "utf-8");
        
        res.json({ message: "Page added successfully", key });
    } catch (error) {
        console.error("Error adding page:", error);
        res.status(500).json({ message: "Error adding page", error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});