# Prisma with PostgreSQL

This project is a TypeScript/JavaScript backend template demonstrating how to connect to a PostgreSQL database using Prisma ORM with the `@prisma/adapter-pg` serverless-ready adapter, and implementing the connection pooling singleton pattern.

## Project Structure
- `prisma/schema.prisma` - The Prisma schema defining the database models (`User` and `Post`).
- `src/db.ts` - The database connection singleton module.
  - Implements the **Singleton Pattern** to prevent database connection leakage during development hot-reloads.
  - Utilizes `@prisma/adapter-pg` driver adapter.
- `prisma.config.ts` - Prisma ORM configuration.

## Getting Started

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Database Connection Configuration
Create a `.env` file in the root directory and add your connection strings:
```env
# The pooled connection string (used by PrismaClient at runtime)
DATABASE_URL="postgres://user:password@pooled-host:5432/db?sslmode=require"

# The direct connection string (used by Prisma CLI for migrations)
DIRECT_URL="postgres://user:password@direct-host:5432/db?sslmode=require"
```

### 3. Migrating the Database
To run migrations and apply changes to your PostgreSQL database:
```bash
npx prisma migrate dev
```

### 4. Common Prisma Commands
Here are the most frequently used Prisma commands for development:

*   **Generate Prisma Client:** Re-generate the client query engine when the schema changes.
    ```bash
    npx prisma generate
    ```
*   **Create Migration:** Create a new migration file and apply it to the database.
    ```bash
    npx prisma migrate dev --name <migration_name>
    ```
*   **Deploy Migrations:** Apply pending migrations to a staging or production database.
    ```bash
    npx prisma migrate deploy
    ```
*   **Direct Schema Push:** Sync schema changes directly to the database without generating migrations (great for prototyping).
    ```bash
    npx prisma db push
    ```
*   **Pull Database Schema:** Introspect an existing database schema to update your `schema.prisma`.
    ```bash
    npx prisma db pull
    ```
*   **Open Prisma Studio:** Launch a visual browser GUI to view and edit your database records.
    ```bash
    npx prisma studio
    ```


---

## Connection Guide: Node.js vs. Next.js

When developing applications with Prisma, manage your database connection strategy based on the environment:

### Connection Types
*   **Pooled Connection (`DATABASE_URL`)**: Best for all regular application traffic. Multiplexes many client connections into a smaller, highly efficient pool.
*   **Direct Connection (`DIRECT_URL`)**: Required for migrations, Prisma Studio, and administrative commands that bypass connection pooling limits.

### Application Runtime Design
*   **Standard Node.js (Express / NestJS)**: Processes are long-running. You can safely instantiate `PrismaClient` once and use it throughout the application lifespan.
*   **Next.js (Serverless / Dev Mode)**: Local development hot-reloading compiles files on change. Plain instantiation runs multiple times, causing connection exhaustion. The singleton pattern in [db.ts](file:///c:/Users/hjeni/OneDrive/Documents/full-stack/database/prismaProject/src/db.ts) guarantees reuse of a single connection instance across hot reloads.
