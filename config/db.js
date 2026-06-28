import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("sportnestDB");

const facilitiesCollection = db.collection("facilities");
const bookingsCollection = db.collection("bookings");

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error(err);
  }
}

export {
  client,
  db,
  connectDB,
  facilitiesCollection,
  bookingsCollection,
};