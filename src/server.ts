import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", protect, router);

app.get("/", (req, res, next) => {
  res.json({ message: "Hello" });
});

app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthoraized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid inputs" });
  } else {
    res.status(500).json({ message: "internal server error" });
  }
});

export default app;
