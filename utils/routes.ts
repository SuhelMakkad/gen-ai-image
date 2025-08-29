export const routes = {
  home: "/",
  signIn: "/signin",
  terms: "/terms",
  privacy: "/privacy",
  chat: (id: string) => `/dashboard/chat/${id}`,
} as const;
