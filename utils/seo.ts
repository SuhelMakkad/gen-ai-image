import { Metadata } from "next";

const BASE_TITLE = "Gen AI Image";

export const getMetaData = (opts: { title?: string; description?: string } = {}): Metadata => {
  return {
    title: opts.title ? `${BASE_TITLE} | ${opts.title}` : BASE_TITLE,
    description: opts.description,
  };
};
