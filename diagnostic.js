import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

async function checkModel(modelName) {
    console.log(`Checking ${modelName}...`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hi");
        console.log(`✅ ${modelName} works!`);
    } catch (e) {
        console.log(`❌ ${modelName} failed: ${e.message}`);
    }
}

async function run() {
    await checkModel("gemini-1.5-flash");
    await checkModel("gemini-1.5-flash-8b");
    await checkModel("gemini-2.0-flash");
}
run();
