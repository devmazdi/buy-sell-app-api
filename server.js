import express from "express";
import dotenv from "dotenv";
import dbCon from "./utils/dbCon.js";
import errorResponse from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";
import cors from "cors";
import helmet from "helmet";

const app = express();
dotenv.config();

// Security headers
app.use(helmet());

// body parser
app.use(express.json());
app.use(cookieParser());

// mongo data sanitize 
app.use(mongoSanitize());

// xss protection
app.use(xssClean());


// CORS
app.use(cors());

// routes
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
app.use('/api/v1/user', authRoutes);
app.use('/api/v1/car', carRoutes);


app.use(errorResponse);
//create server
const PORT = process.env.PORT || 5500;

// connect to mongo db and
dbCon().then(con => {
    if(con) app.listen(5500, ()=>console.log(`app running on http://localhost:${PORT}`));
});
