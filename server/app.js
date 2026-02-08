import express from 'express';
const app = express();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import userRoutes from './routes/user.routes.js';
import courseRoutes from "./routes/course.routes.js"
import contactRoutes from "./routes/miscellaneous.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import errorMiddleware from './middlewares/error.middleware.js';

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// app.use(cors({
//       origin : [process.env.FRONTEND_URL],
//       credentials : true,
// }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);  // Preflight request handle
    }

    next();
});

app.use(cookieParser());


app.use(morgan('dev'));

app.use('/ping', (req, res) => {
      res.send('/pong');
})

//routes of three module

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/contact', contactRoutes);



//agar user undefined url deta hai 

app.use((req, res) => {
      res.status(404).send('OOPS!! 404 page not found');
})

app.use(errorMiddleware);

export default app;