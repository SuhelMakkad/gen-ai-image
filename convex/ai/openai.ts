import OpenAI from "openai";

import { env } from "../lib/env";
import { systemPrompt } from "./systemPrompt";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: env.OPENROUTER_API_KEY,
});

export const genImage = async (prompt: string, style: string) => {
  const completion = await openai.chat.completions.create({
    model: "google/gemini-2.5-flash-image-preview",

    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: systemPrompt,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `${prompt} The style of the image is ${style}.`,
          },
        ],
      },
    ],
  });

  const choice = completion.choices?.at(0);
  if (!choice) {
    return null;
  }

  const message = choice.message as OpenAI.Chat.Completions.ChatCompletionMessage & {
    images: { type: "image_url"; image_url: { url: string }; index: 0 }[];
  };

  const imageUrl = message.images?.at(0)?.image_url.url;
  if (!imageUrl) {
    return null;
  }

  return imageUrl;
};
