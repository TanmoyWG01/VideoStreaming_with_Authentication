import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRouter from "./routes/AuthRouter.js";
import { createReadStream, statSync } from "fs";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./MiddleWare/Authmiddleware.js";
import { logout } from "./controllers/AuthController.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;
const url = process.env.MONGO_URL;

const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB Database!");
  } catch (err) {
    throw err;
  }
};

app.get("/", authenticateToken, (req, res) => {
  res.send("Hello First request!");
});

const videoFileMap = {
  "video1": "public/Videos/video1.mp4",
  "video2": "public/Videos/video2.mp4",
  "video3": "public/Videos/video3.mp4",
  "video4": "public/Videos/video4.mp4",
  "video5": "public/Videos/video5.mp4"
};

app.get("/video/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = videoFileMap[fileName];
  if (!fileName) {
    res.status(400).send({ message: "Invalid filename" });
  }
  const Stat = statSync(filePath);
  const fileSize = Stat.size;
  const rangeHeader = req.headers.range;

  if (rangeHeader) {
    const chunkSize = 10 ** 6;

    const start = Number(rangeHeader.replace(/\D/g, ""));

    const end = Math.min(start + chunkSize, fileSize - 1);

    const contentLength = end - start + 1;

    const fileStream = createReadStream(filePath, {
      start,
      end,
    });

    fileStream.pipe(res);

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
  } else {
    res.send("Requires range header.");
  }
});

//MiddleWare

app.use("/api/auth", AuthRouter);
app.post("/api/logout", logout);


app.listen(PORT, () => {
  connect();
  console.log(`Server is connected on port ${PORT}....`);
});
