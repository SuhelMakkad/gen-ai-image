import { GenImageForm } from "./components/gen-img-form";
import { GenerationHistory } from "./components/generation-history";

const GenImagePage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid h-[calc(100vh-300px)] place-items-center">
        <GenImageForm className="bg-card shadow-xs flex w-full max-w-2xl flex-col justify-center gap-4 rounded-lg border p-4" />
      </div>

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-4">
        <h1 className="text-lg font-medium">Result</h1>

        <GenerationHistory />
      </section>
    </div>
  );
};

export default GenImagePage;
