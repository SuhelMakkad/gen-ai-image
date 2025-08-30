import { httpRouter } from "convex/server";

import { auth } from "./auth";
import { polar } from "./polar";

const http = httpRouter();

polar.registerRoutes(http);
auth.addHttpRoutes(http);

export default http;
