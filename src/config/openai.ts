import { OpenAI } from "openai";

// TEMP - add more geenral solution for it
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
