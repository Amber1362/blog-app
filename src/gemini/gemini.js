import conf from "../conf/conf";
import { GoogleGenAI } from "@google/genai";

export class AiService {
    client;
    constructor() {
        this.client = new GoogleGenAI({
            apiKey: conf.geminiApiKey
        })
    }

    async GeminiAi({content}) {
          try {
              return await this.client.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: content,
                config: {
                    maxOutputTokens: 900,
                    temperature: 0.7,
                },
              })
          } catch (error) {
              throw error
          }
    }
}

const aiService = new AiService()
export default aiService