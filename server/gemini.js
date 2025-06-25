// server/gemini.js
import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    res.json({ text: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate content.' });
  }
});

export default router;
