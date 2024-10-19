import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path'; 
import connectDB from './config/db.js';
import appRouter from './routes/v1/index.js';
import errorHandlerMiddleware from './middlewares/errorHandler.middleware.js';
import notFoundMiddleware from './middlewares/notFound.middleware.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


app.use('/api/v1', appRouter);

if (process.env.NODE_ENV === "production") {
    const buildPath = path.join(__dirname, '..',"..", 'client', 'dist');
    app.use(express.static(buildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });
}

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const args = process.argv.slice(2);
const portArgIndex = args.indexOf('--port');
const PORT = portArgIndex !== -1 ? Number(args[portArgIndex + 1]) : Number(process.env.PORT) || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

