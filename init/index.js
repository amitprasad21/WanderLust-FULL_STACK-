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
  const mode = dbUrl.includes("mongodb+srv") ? "Atlas" : "Local MongoDB";
  console.log(`Connected to DB for seed: ${mode}`);
  console.log(`Database name: ${mongoose.connection.name}`);
}

async function createSeedUserIfNeeded() {
  const seedEmail = process.env.INIT_OWNER_EMAIL || "seed@wanderlust.com";
  const seedUsername = process.env.INIT_OWNER_USERNAME || "wanderlust_seed_owner";
  const seedPassword = process.env.INIT_OWNER_PASSWORD || "WanderLust@123";

  let user = await User.findOne({ email: seedEmail });
  if (user) return user._id;

  user = await User.findOne({ username: seedUsername });
  if (user) return user._id;

  const newUser = new User({ email: seedEmail, username: seedUsername });
  const registered = await User.register(newUser, seedPassword);
  console.log(`Seed owner created: ${registered.username}`);
  return registered._id;
}

async function resolveOwnerId() {
  if (process.env.INIT_OWNER_ID) {
    return process.env.INIT_OWNER_ID;
  }

  const firstUser = await User.findOne({}, { _id: 1 });
  if (firstUser) {
    return firstUser._id;
  }

  // If DB has no users, create one automatically so seeding still works.
  return createSeedUserIfNeeded();
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

  const total = await Listing.countDocuments();
  console.log(`Seed complete. Inserted: ${inserted}, Skipped(existing): ${skipped}, Total now: ${total}`);
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
