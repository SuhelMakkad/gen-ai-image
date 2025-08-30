import { GeometricBackground } from "@/components/ui/geometric-background";

import { GenImageForm } from "./components/gen-img-form";
import { UserGenerationHistory } from "./components/generation-history";

const GenImagePage = () => {
  return (
    <div className="flex flex-col gap-10">
      <GeometricBackground className="fixed inset-0 -z-10" />

      <div className="grid h-[calc(100vh-300px)] place-items-center">
        <GenImageForm className="bg-card shadow-xs flex w-full max-w-2xl flex-col justify-center gap-4 rounded-lg border p-4" />
      </div>

      <section className="mx-auto mb-20 flex w-full max-w-4xl flex-col gap-4">
        <h1 className="text-lg font-medium">Generated Images</h1>

        <UserGenerationHistory />
      </section>
    </div>
  );
};

export default GenImagePage;
