import { MongoClient } from "mongodb";
const mongoUri = process.env.MONGODB_URI

const client = new MongoClient(mongoUri as string);

let clientPromise: Promise<MongoClient>;
if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so the MongoClient is not constantly recreated during hot reloading
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
}else{
 // In production, it's safe to not use a global variable
  clientPromise = client.connect();
}

export default clientPromise;