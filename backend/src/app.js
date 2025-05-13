import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import router from "./routes/router.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).send({ error: "Route non trouvée" });
});

export default app;
