import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
app.use(cors());

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
const db = client.db("PAC");

app.get("/categories", async (req, res) => {
  const cat = await db.collection("categories").findOne({});
  res.json(cat.Categories);
});

app.get("/files", async (req, res) => {
  const files = await db.collection("files").find({}).toArray();
  res.json(files);
});

app.listen(3001, () => console.log("API running on port 3001"));