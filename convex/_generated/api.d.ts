/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as ai_helpers from "../ai/helpers.js";
import type * as ai_openai from "../ai/openai.js";
import type * as ai_systemPrompt from "../ai/systemPrompt.js";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as images from "../images.js";
import type * as lib_base64ToBlob from "../lib/base64ToBlob.js";
import type * as lib_env from "../lib/env.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "ai/helpers": typeof ai_helpers;
  "ai/openai": typeof ai_openai;
  "ai/systemPrompt": typeof ai_systemPrompt;
  auth: typeof auth;
  http: typeof http;
  images: typeof images;
  "lib/base64ToBlob": typeof lib_base64ToBlob;
  "lib/env": typeof lib_env;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
