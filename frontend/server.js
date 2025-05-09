import fs from "fs/promises";
import http from "http";
import path from "path";
import { fileURLToPath, URL } from "url";

// Server listening port
const PORT = 3000;

// Derive __filename and __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to the public directory
const publicDir = path.resolve(__dirname, "public");

// Routes mapping to specific HTML pages under public/pages
const routes = {
  "/": "index.html",
  "/inscription": "register.html",
  "/connexion": "login.html",
  "/profile": "profile.html",
};

/**
 * Get the MIME type (Content-Type) for a given file path.
 *
 * @param {string} filePath - Absolute path to the file
 * @returns {string} MIME type string with charset if applicable
 */
const getContentType = (filePath) => {
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
};

/**
 * Resolve and normalize a URL pathname to an absolute file path under publicDir.
 * Protects against directory traversal attacks by enforcing that the
 * resolved path must start with the publicDir path.
 *
 * @param {string} pathname - The URL pathname (e.g. '/styles/main.css')
 * @throws {Error} with code 'EACCES' if the path is outside publicDir
 * @returns {string} Absolute file path to serve
 */
const resolveFilePath = (pathname) => {
  const decoded = decodeURIComponent(pathname);
  const fullPath = path.join(publicDir, decoded);
  const normalized = path.normalize(fullPath);

  // Ensure the normalized path is within the publicDir
  if (!normalized.startsWith(publicDir + path.sep)) {
    throw Object.assign(new Error("Access denied"), { code: "EACCES" });
  }

  // If the pathname matches a route, serve the mapped HTML page
  if (routes[pathname]) {
    return path.join(publicDir, "pages", routes[pathname]);
  }

  return normalized;
};

/**
 * Set security-related HTTP headers on the response.
 *
 * @param {http.ServerResponse} res - The HTTP response object
 */
const setSecurityHeaders = (res) => {
  // Define a strict Content Security Policy
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self'",
      "connect-src 'self' http://localhost:4000",
    ].join("; "),
  );

  // Force HTTPS for one year (HSTS)
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Do not send referer header
  res.setHeader("Referrer-Policy", "no-referrer");

  // Hide technology stack details
  res.removeHeader("X-Powered-By");
};

/**
 * Main HTTP request handler.
 * Parses the URL, resolves the file, and serves it with appropriate headers.
 * Handles 400, 403, 404, and 500 status codes.
 *
 * @param {http.IncomingMessage} req - The HTTP request.
 * @param {http.ServerResponse} res - The HTTP response.
 */
const requestHandler = async (req, res) => {
  // Apply security headers on every response
  setSecurityHeaders(res);

  let pathname;
  try {
    // Parse pathname from URL
    ({ pathname } = new URL(req.url, `http://localhost:${PORT}`));
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("400 - Bad Request");
  }

  let filePath;
  try {
    filePath = resolveFilePath(pathname);
  } catch (err) {
    const status = err.code === "EACCES" ? 403 : 400;
    res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(`${status} - ${status === 403 ? "Access denied" : "Bad Request"}`);
  }

  try {
    // Read file as buffer and serve it
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": getContentType(filePath) });
    return res.end(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      // Custom 404 page if available
      try {
        const nf = path.join(publicDir, "pages", "404.html");
        const html404 = await fs.readFile(nf, "utf-8");
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        return res.end(html404);
      } catch {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("404 - Not Found");
      }
    }
    // Generic server error
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("500 - Internal Server Error");
  }
};

// Create and start the HTTP server
const server = http.createServer(requestHandler);
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
