import OpenAI from "openai";

import { env } from "../lib/env";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: env.OPENROUTER_API_KEY,
});

export const genImage = async (prompt: string, style: string) => {
  const completion = await openai.chat.completions.create({
    model: "google/gemini-2.5-flash-image-preview:free",

    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `You are a helpful assistant that generates images based on a prompt. Only respond with the image data and nothing else. The style of the image is ${style}.`,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
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
