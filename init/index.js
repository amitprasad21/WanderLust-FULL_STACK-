if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";
const resetMode = process.argv.includes("--reset");

async function connectDB() {
  await mongoose.connect(dbUrl);
  console.log("Connected to DB for seed:", dbUrl.includes("mongodb+srv") ? "Atlas" : "Local MongoDB");
}

async function resolveOwnerId() {
  // Highest priority: explicit env owner id.
  if (process.env.INIT_OWNER_ID) {
    return process.env.INIT_OWNER_ID;
  }

  // Fallback: first available user in DB.
  const firstUser = await User.findOne({}, { _id: 1 });
  if (firstUser) {
    return firstUser._id;
  }

  throw new Error(
    "No user found for listing ownership. Create a user first or set INIT_OWNER_ID in .env"
  );
}

async function seedListings() {
  const ownerId = await resolveOwnerId();

  if (resetMode) {
    await Listing.deleteMany({});
    console.log("Reset mode enabled: existing listings deleted.");
  }

  let inserted = 0;
  let skipped = 0;

  for (const item of initData.sampleListings) {
    const existing = await Listing.findOne({
      title: item.title,
      location: item.location,
      country: item.country,
    }).select("_id");

    if (existing) {
      skipped += 1;
      continue;
    }

    await Listing.create({
      ...item,
      owner: ownerId,
    });
    inserted += 1;
  }

  console.log(`Seed complete. Inserted: ${inserted}, Skipped(existing): ${skipped}`);
}

(async () => {
  try {
    await connectDB();
    await seedListings();
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("DB connection closed.");
  }
})();
