import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import geminiRoutes from './gemini.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/gemini', geminiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
