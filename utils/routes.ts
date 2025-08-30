export const routes = {
  home: "/",
  signIn: "/signin",
  terms: "/terms",
  privacy: "/privacy",
  gen: (id: string) => `/dashboard/gen/${id}`,
} as const;
