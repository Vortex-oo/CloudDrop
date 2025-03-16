import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './routes/share.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: process.env.Frontend_URL || 'http://localhost:5173',
        credentials: true
    }
))

app.use('/api', router)

app.get('/', (req, res) => {
    res.json({ message: 'CloudDrop API is running' });
});


if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;