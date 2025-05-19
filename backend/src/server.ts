import app from './app.js';
import prisma from './db.js';
import * as console from "node:console";


const port = process.env.PORT || 3000;

async function connectToDbWithRetry(retries: number = 5, delay: number = 5000) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Connecting to database... (attempt ${i + 1})`);
            await prisma.$connect();
            console.log('Successfully connected to database');
            return;
        }catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
        console.error(`Connect to database...(attempt ${i+1}) failed: ${errorMessage}`);
            if (i === retries - 1) {
                console.error(`Failed to connect to database after ${retries} attempts. Exiting...`);
               throw err;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

const startServer = async () => {
    try {
        await connectToDbWithRetry();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log('Press Ctrl+C to stop\n');
        });
    }catch (err) {
        console.error("Error during server startup (failed to connect to DB or start Express)", err);
        await prisma.$disconnect().catch(disconnectErr => {
            console.error("Error disconnecting Prisma Client:", disconnectErr);
        });
        process.exit(1);
    }
};

startServer();

const graceFulShutdown = async (signal: string) => {
    console.log(`Received kill signal ${signal}, shutting down gracefully.`);
    try {
        await prisma.$disconnect();
        console.log('Disconnected from database and shut down successfully.');
        process.exit(0);
    } catch (err) {
        console.error("Error disconnecting Prisma Client:", err);
        process.exit(1);
    }
};

process.on('SIGINT', () => graceFulShutdown('SIGINT'));
process.on('SIGTERM', () => graceFulShutdown('SIGTERM'));

