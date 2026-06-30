import "dotenv/config"
import { PrismaClient } from "./src/generated/prisma/client.ts";
// Import the driver adapter for your specific database (example uses PostgreSQL)
import { PrismaPg } from "@prisma/adapter-pg";

// Initialize the adapter according to your driver's requirements
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Pass the adapter instance to PrismaClient
const prisma = new PrismaClient({ adapter });

// Find all users with their posts
const users = await prisma.user.findMany({
    include: { posts: true },
});

// Create a user with a post

const createUser = async () => {

    try {

        const user = await prisma.user.create({
            data: {
                email: `alicssseland${Date.now()}@prisma.io`,
                posts: {
                    create: { title: "Hello World" },
                },
                name: "elsissscae"
            },
        });
        console.log(user)

    } catch (err) {
        console.log(err)
    }

}

const findManyUser = async () => {
    const users = await prisma.user.findMany()
    console.log(users)
}

const updateUser = async () => {
    const updatedUser = await prisma.user.update({
        where: {
            email: "[EMAIL_ADDRESS]"
        },
        data: {
            name: "elsissscae"
        }
    })
    console.log(updatedUser)
}

try {
    // findManyUser()
    // createUser()
    updateUser()
} catch (error) {
    console.log(error)
} 