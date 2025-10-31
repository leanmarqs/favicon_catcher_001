import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import path from "path";
import { URL } from "url";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Função que obtém o favicon de uma página e salva localmente.
 */
export async function downloadFavicon(pageUrl: string): Promise<string | null> {
  try {
    const response = await axios.get(pageUrl);
    const $ = cheerio.load(response.data);

    // Tenta encontrar links <link rel="icon"> ou <link rel="shortcut icon">
    let faviconUrl =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      "/favicon.ico";

    const baseUrl = new URL(pageUrl);
    const fullFaviconUrl = new URL(faviconUrl, baseUrl).href;

    const faviconResponse = await axios.get(fullFaviconUrl, {
      responseType: "arraybuffer",
    });

    // Garante que a pasta existe
    const dir = path.join(__dirname, "./assets/favicons");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const fileName = `${baseUrl.hostname}.ico`;
    const filePath = path.join(dir, fileName);

    fs.writeFileSync(filePath, faviconResponse.data);

    console.log(`✅ Favicon salvo: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error("Erro ao baixar favicon:", error);
    return null;
  }
}
