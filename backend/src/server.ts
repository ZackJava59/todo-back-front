import app from './app.js';

const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log('Press Ctrl+C to stop\n');
        });
    }catch (err) {
        console.error("Error starting server", err);
        process.exit(1);
    }
};

startServer()


