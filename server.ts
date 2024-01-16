// import express from 'express';
// import mongoose from 'mongoose';
// import { applyRoutes } from './routes';
// import { applyMiddleware } from './middleware';
// import { MongoMemoryServer } from 'mongodb-memory-server';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// applyMiddleware(app);

// // Routes
// applyRoutes(app);

// // Not found handler
// app.use((req, res) => {
//   res.status(404).send('Not found');
// });

// // Error handler
// app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// let mongoServer: MongoMemoryServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const mongoUri = mongoServer.getUri();

//   const connectOptions: mongoose.ConnectOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

//   await mongoose.connect(mongoUri, connectOptions);
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// // Your test suites and cases go here

// // Start the server for testing
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Export the server for testing purposes
// export default server;
