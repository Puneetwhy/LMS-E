import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import userRoutes from './routes/user.routes.js';
import courseRoutes from "./routes/course.routes.js";
import miscellaneousRoutes from "./routes/miscellaneous.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173', 
    'https://lms-e-j7ct.onrender.com'                  
];

app.use(cors({
    origin: function(origin, callback){
      
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1){
            const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
            return callback(new Error(msg), false);
        }

        return callback(null, true);
    },
    credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());


app.use(morgan('dev'));


app.use('/ping', (req, res) => {
    res.send('/pong');
});


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscellaneousRoutes);


app.use((req, res) => {
    res.status(404).send('OOPS!! 404 page not found');
});


app.use(errorMiddleware);

export default app;
