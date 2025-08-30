import { GenImageForm } from "./components/gen-img-form";
import { GenerationHistory } from "./components/generation-history";

const GenImagePage = () => {
  return (
    <div className="grid grid-cols-10 gap-4">
      <section className="bg-card col-span-4 flex flex-col gap-4 rounded-md border p-4 shadow-sm">
        <h1 className="text-lg font-medium">Create Image</h1>

        <GenImageForm />
      </section>

      <section className="bg-card col-span-6 flex flex-col gap-4 rounded-md border p-4 shadow-sm">
        <h1 className="text-lg font-medium">Result</h1>

        <GenerationHistory />
      </section>
    </div>
  );
};

export default GenImagePage;
