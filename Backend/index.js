import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './routes/share.routes.js';

const app = express();


const allowedOrigins = [
    'http://localhost:5173',
    'https://clouddrop-frontend.vercel.app'
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'CloudDrop API is running' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;