import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const db = client.db("sportnestDB");

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
  }
}

export { client, db, connectDB };