import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "VDR PRODUCTION API" });
  });

  // Contact form submission endpoint
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, projectType, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Veuillez remplir tous les champs obligatoires (nom, email, message).",
      });
    }

    // In a production environment, this would send an email via SendGrid/Resend/SMTP
    // to dosreisvincentprod@gmail.com
    console.log("New contact submission received for VDR Production:", {
      name,
      email,
      phone,
      projectType,
      budget,
      message,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: "Votre message a bien été transmis à Vincent Dos Reis. Vous recevrez une réponse sous 24 à 48 heures.",
      details: {
        recipient: "dosreisvincentprod@gmail.com",
        phone: "06 81 98 33 82",
      },
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const publicPath = path.join(process.cwd(), "public");
    app.use(express.static(distPath));
    app.use(express.static(publicPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VDR Production server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
