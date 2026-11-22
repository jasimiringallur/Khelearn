const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is missing. Add it to the project root .env file.");
  process.exit(1);
}

const app = express();
const allowedOrigins = new Set([
  "http://127.0.0.1:5500",
  "http://localhost:5500"
]);
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin is not allowed by CORS."));
  },
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 204
};

app.options("/api/generate", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const port = Number(process.env.PORT) || 3000;

app.post("/api/generate", async (req, res) => {
  try {
    const { lessonText, grade, subject, games } = req.body || {};

    if (
      typeof lessonText !== "string" ||
      !lessonText.trim() ||
      typeof grade !== "string" ||
      !grade.trim() ||
      typeof subject !== "string" ||
      !subject.trim() ||
      !Array.isArray(games) ||
      games.length === 0 ||
      games.some(game => typeof game !== "string" || !game.trim())
    ) {
      return res.status(400).json({
        error: "Please provide lesson text, grade, subject and games."
      });
    }

    if (lessonText.length > 30000) {
      return res.status(400).json({
        error: "Lesson is too long. Please use a shorter lesson."
      });
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      instructions: `You are an educational game creator for primary school children.
Create simple, age-appropriate educational games using only the supplied lesson material.
Do not introduce unrelated facts.
Return valid JSON only, without markdown.

Format:
{
  "games": [
    {
      "type": "Quiz",
      "title": "Game title",
      "questions": [
        {
          "question": "Question",
          "options": ["A", "B", "C", "D"],
          "answer": "Correct option",
          "explanation": "Simple explanation"
        }
      ]
    }
  ]
}

Provide 5 questions for each requested game type. Use the same question fields for every game type.
Adapt the vocabulary and difficulty to the selected grade.
Represent matching, memory, fill-in-the-blank, word-hunt and puzzle activities as questions with suitable options, answers and explanations.`,
      text: {
        format: { type: "json_object" }
      },
      input: `Return a JSON object containing the requested games.
Grade: ${grade}
Subject: ${subject}
Requested games: ${games.join(", ")}

Lesson material:
${lessonText}

Create the requested games using this material.`
    });

    const generated = JSON.parse(response.output_text);

    if (!generated || !Array.isArray(generated.games) || generated.games.length === 0) {
      throw new Error("The AI response did not contain a games list.");
    }

    res.json(generated);

  } catch (error) {
    console.error("Generation error:", error.message);

    const isQuotaError = error.status === 429 &&
      (error.code === "insufficient_quota" || /no credits remaining|insufficient_quota/i.test(error.message || ""));
    const errorMessage = error.status === 401 || error.status === 403
      ? "OpenAI rejected the API key. Verify that it is active, has Responses API write permission (api.responses.write), and that your organization and project roles allow API requests."
      : isQuotaError
        ? "Your OpenAI API account has no credits remaining. Add API billing credits, then try generating again."
        : error.status === 429
          ? "The OpenAI API is temporarily rate-limiting requests. Wait a little and try again."
          : "Game generation failed. Please try again. Check the backend terminal for details.";

    res.status(502).json({
      error: errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Khelearn backend running at http://localhost:${port}`);
});