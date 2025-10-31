import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { downloadFavicon } from "./utils/downloadFavicon.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.post("/favicon", async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL é obrigatória." });
  }

  const savedPath = await downloadFavicon(url);

  if (!savedPath) {
    return res.status(500).json({ error: "Falha ao obter favicon." });
  }

  return res.json({ message: "Favicon salvo com sucesso!", path: savedPath });
});

export default app;
