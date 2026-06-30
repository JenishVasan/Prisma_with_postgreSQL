import "dotenv/config";
import { PrismaClient } from "./src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

// Initialize the adapter with connectionString (matching official documentation syntax)
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Initialize Prisma Client with the driver adapter
const prisma = new PrismaClient({ adapter });

async function main() {
    // 1. Find all users including their posts
    const users = await prisma.user.findMany({
        include: { posts: true },
    });
    console.log("Existing Users:", users);

    // 2. Create a new user with a post
    // Note: 'name' is required by your schema.prisma, and 'email' must be unique.
    const newUser = await prisma.user.create({
        data: {
            email: `alice-${Date.now()}@prisma.io`,
            name: "Alice",
            posts: {
                create: { title: "Hello World" },
            },
        },
    });
    console.log("Newly Created User:", newUser);
}

main()
    .catch((error) => {
        console.error("Error executing query:", error);
    });