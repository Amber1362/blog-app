import conf from "../conf/conf";
import { GoogleGenAI } from "@google/genai";

export class AiService {
    client;

    constructor() {
        this.client = new GoogleGenAI({
            apiKey: conf.geminiApiKey
        })
    }

    async GeminiAi({model, content}) {
          try {
              return await this.client.models.generateContent({
                model,
                contents: content,
              })
          } catch (error) {
              throw error
          }
    }
}

const aiService = new AiService()
export default aiService