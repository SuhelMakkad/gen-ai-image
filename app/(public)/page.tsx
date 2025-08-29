import { PromptTextarea } from "./components/prompt-textarea";

const HomePage = () => {
  return (
    <main className="container mx-auto flex-1 px-4 py-8">
      <section className="flex h-[calc(100vh-300px)] flex-col items-center justify-center gap-10">
        <header className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-foreground text-3xl font-medium">Generate Image with AI</h1>
          <p className="text-muted-foreground max-w-lg text-center text-base">
            Create stunning AI-generated images with advanced machine learning models. Transform
            your ideas into visual art.
          </p>
        </header>

        <PromptTextarea />
      </section>
    </main>
  );
};

export default HomePage;
