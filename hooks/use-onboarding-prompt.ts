import { useSessionStorage } from "usehooks-ts";

export const useOnboardingPrompt = () => {
  const [prompt, setPrompt] = useSessionStorage("onboarding-prompt", "");

  return { prompt, setPrompt };
};
