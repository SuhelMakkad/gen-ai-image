import { GenImageForm } from "./components/gen-img-form";
import { GenerationHistory } from "./components/generation-history";

const GenImagePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <GenImageForm className="bg-card shadow-xs mx-auto flex w-full max-w-2xl flex-col gap-4 rounded-lg border p-4" />

      <section className="bg-card flex flex-col gap-4 rounded-md border p-4 shadow-sm">
        <h1 className="text-lg font-medium">Result</h1>

        <GenerationHistory />
      </section>
    </div>
  );
};

export default GenImagePage;
