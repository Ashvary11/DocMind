import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined");
}
const uri: string = MONGODB_URI;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// attach to global safely
const globalAny = global as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

// initialize once
if (!globalAny.mongooseCache) {
  globalAny.mongooseCache = {
    conn: null,
    promise: null,
  };
}

const cached = globalAny.mongooseCache;

export async function connectDB() {
  try {
    if (cached.conn) {
      console.log("🟢 MongoDB already connected (using cache)");
      return cached.conn;
    }

    if (!cached.promise) {
      console.log("🟡 Connecting to MongoDB...");
      cached.promise = mongoose.connect(uri);
    }

    cached.conn = await cached.promise;
    console.log("🟢 MongoDB connected successfully");
    return cached.conn;
  } catch (error) {
    cached.promise = null;

    console.log("🔴 MongoDB connection failed");
    throw error;
  }
}
