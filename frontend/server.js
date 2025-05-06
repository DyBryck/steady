import fs from "fs/promises";
import http from "http";
import path from "path";
import { fileURLToPath, URL } from "url";

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, "public");

const routes = {
  "/": "index.html",
  "/inscription": "signUp.html",
  "/connexion": "login.html",
};

/**
 * Retourne le type MIME (Content-Type) adapté à un fichier.
 *
 * @param {string} filePath - Chemin complet du fichier
 * @returns {string} Content-Type (MIME) à fournir
 */
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
  };
  return mimeTypes[ext] || "application/octet-stream";
}

/**
 * Détermine le chemin absolu du fichier à servir à partir du pathname.
 *
 * @param {string} pathname - Partie pathname de l'URL (ex. '/style.css')
 * @returns {string} Chemin absolu vers le ressource
 */
function resolveFilePath(pathname) {
  // Si une route est définie, on sert la page HTML correspondante
  if (routes[pathname]) {
    return path.join(publicDir, "pages", routes[pathname]);
  }
  // Sinon on sert directement le fichier sous public/
  return path.join(publicDir, pathname);
}

// Création du serveur HTTP
const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${PORT}`);
  const filePath = resolveFilePath(pathname);

  try {
    // Lecture asynchrone du fichier demandé
    const data = await fs.readFile(filePath);
    // Réponse 200 avec le bon Content-Type
    res.writeHead(200, { "Content-Type": getContentType(filePath) });
    res.end(data);
  } catch (err) {
    // Si le fichier est introuvable, erreur ENOENT
    if (err.code === "ENOENT") {
      // Chemin vers la page 404 personnalisée
      const nf = path.join(publicDir, "pages", "404.html");
      try {
        const html404 = await fs.readFile(nf, "utf-8");
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html404);
      } catch {
        // Si la page 404 custom est manquante, message texte basique
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 - Page non trouvée");
      }
    } else {
      // Pour toute autre erreur, renvoyer une 500 générique
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("500 - Erreur serveur");
    }
  }
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
