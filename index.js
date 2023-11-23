import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import  cors from 'cors';


import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from './routes/userRoutes.js';

// Load environment variables from a .env file
dotenv.config();

// Connect to the database
connectDB();

// Set the port for the server
const port = process.env.PORT || 5000;

// Create an Express application
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable cookies and other credentials to be sent with the request
};

app.use(cors(corsOptions));


// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Route for user-related API endpoints
app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
