import mongoose from "mongoose";

const url =
  "mongodb+srv://adirana1:XuQxPtAgQgveSAzt@cluster003.hblmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster003";
export async function createDBConnection() {
  const db = await mongoose.connect(url);
  return db;
}
