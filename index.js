import "dotenv/config";
import { PrismaClient } from "./src/generated/prisma/client.ts";
// Import the driver adapter for your specific database (example uses PostgreSQL)
import { PrismaPg } from "@prisma/adapter-pg";

// Initialize the adapter with connectionString (matches official Prisma documentation)
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

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
