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
  console.log("ENDPOINT HIT")
  try {
    // Extract parameters from the request
    const { name, email, dob, tob, location, today } = req.query;
    console.log(name, " ", email, " ", dob, " ", tob, " ", location)
    // Construct the message content based on the received parameters
    const messageContent = `Act as a professional astrologer and give a daily astrology reading for ${name}, born on ${dob} at ${tob} in ${location}. Todays date is ${today}. Return the reading in markdown format.`;

    // Make the OpenAI API request
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: messageContent }],
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
