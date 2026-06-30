import "dotenv/config";
import { PrismaClient } from "./src/generated/prisma/client.ts";
// Import the driver adapter for your specific database (example uses PostgreSQL)
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Initialize the pg connection pool using the environment variable
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// Pass the pg pool to the Prisma Pg adapter
const adapter = new PrismaPg(pool);

// Pass the adapter instance to PrismaClient
const prisma = new PrismaClient({ adapter });

// Find all users with their posts
const users = await prisma.user.findMany({
    include: { posts: true },
});
console.log("Users:", users);

// Create a user with a unique email to avoid unique constraint errors
const user = await prisma.user.create({
    data: {
        email: `alice-${Date.now()}@prisma.io`,
        name: "Alice",
        posts: {
            create: { title: "Hello World" },
        },
    },
});

console.log("Created User:", user);

// Close connection pool
await pool.end();