const { GoogleGenerativeAI } = require("@google/generative-ai");
const { config } = require("dotenv");

config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY)
module.exports["GenAI"] = genAI
module.exports["model"] = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
