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
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
    res.json({ text });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: err.message || 'Failed to generate content.' });
  }
});

export default router;
