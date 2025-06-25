import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Full message history
let messages = [];

// Threshold before summarizing
const MAX_HISTORY_BEFORE_SUMMARY = 10;

async function summarizeOldMessages(history) {
  try {
    const summaryPrompt = [
      ...history,
      { role: 'user', parts: [{ text: 'Summarize the above conversation in a few sentences.' }] }
    ];

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: summaryPrompt,
    });

    const summary = result.candidates?.[0]?.content?.parts?.[0]?.text || 'Summary not available';
    return summary;
  } catch (err) {
    console.error('Summarization failed:', err);
    return 'Summary not available.';
  }
}

router.post('/generate', async (req, res) => {
  const { prompt, reset } = req.body;

  if (reset) {
    messages = [];
    return res.json({ text: 'Chat history reset.' });
  }

  messages.push({ role: 'user', parts: [{ text: prompt }] });

  // Auto-summarize if too long
  if (messages.length > MAX_HISTORY_BEFORE_SUMMARY) {
    const oldMessages = messages.slice(0, -6); // All but last few turns
    const summaryText = await summarizeOldMessages(oldMessages);

    // Replace older history with system summary
    messages = [
      { role: 'user', parts: [{ text: `Summary of previous conversation: ${summaryText}` }] },
      ...messages.slice(-6) // Keep last few messages
    ];
  }

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: messages,
    });

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    messages.push({ role: 'model', parts: [{ text }] });

    res.json({ text });
  } catch (err) {
    console.error('Gemini API Error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate content.' });
  }
});

export default router;
