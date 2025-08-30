import { GradientBars } from "@/components/ui/gradient-bars";
import { TextRipple } from "@/components/ui/text-ripple";

import { PromptTextarea } from "./components/prompt-textarea";
import { PublicShowcase } from "./components/public-showcase";

const HomePage = () => {
  return (
    <main className="container mx-auto flex-1 px-4 py-8">
      <section className="flex h-[calc(100vh-200px)] flex-col items-center justify-center gap-10">
        <header className="flex flex-col items-center justify-center gap-3">
          <TextRipple className="text-foreground text-3xl font-medium">
            Generate Image with AI
          </TextRipple>
          <p className="text-muted-foreground max-w-lg text-center text-base">
            Create stunning AI-generated images with advanced machine learning models. Transform
            your ideas into visual art.
          </p>
        </header>

        <PromptTextarea />

        <GradientBars />
      </section>

      <section className="mx-auto mb-20 flex w-full max-w-4xl flex-col gap-4">
        <h2 className="text-lg font-medium">Showcase</h2>

        <PublicShowcase />
      </section>
    </main>
  );
};

export default HomePage;
