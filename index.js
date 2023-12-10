const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require('dotenv').config()

const app = express();
const port = 3000; // You can choose any available port

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
});

app.use(cors());

app.get("/generateCompletion", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Act as a professional astrologer and give an astrology reading for someone born on the 7th of July 1963 in Portland, England at 1am" }],
      model: "gpt-3.5-turbo",
    });

    res.send({ completion: completion.choices[0] });
  } catch (error) {
    console.error("Error generating completion:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
