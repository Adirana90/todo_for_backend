import { MongoClient } from "mongodb";

async function run() {
  const client = new MongoClient("mongodb://admin:password@localhost:27017");
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("myDatabase");
    const collection = db.collection("users");

    // Insert a document
    await collection.insertOne({ name: "Ram", age: 25 });

    // Query the document
    const user = await collection.findOne({ name: "Ram" });
    console.log("Found User:", user);

    // CRUD
    await collection.insertOne({ name: "Shyam", age: 30 });
    const users = await collection.find().toArray();
    console.log("users", users);

    // Update a document
    // discount all products
    await collection.updateOne(
      {
        name: "Shyam",
      },
      {
        $set: {
          age: 25,
          name: "Shyam Gupta",
        },
      }
    );

    const updatedUsers = await collection.find().toArray();
    console.log("update users", updatedUsers);

    // Delete a document
    await collection.deleteOne({ name: "Shyam Gupta" });
    const deletedUsers = await collection.find().toArray();
    console.log("deleted users", deletedUsers);

    await collection.insertOne({ name: "gita", age: 20, gender: "female" });
    const createUser = await collection.findOne({ name: "gita" });
    console.log("Found User:", createUser);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
