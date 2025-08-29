import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <main className="container mx-auto flex-1 px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-foreground mb-4 text-4xl font-bold">Generate AI Images</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl text-xl">
          Create stunning AI-generated images with advanced machine learning models. Transform your
          ideas into visual art.
        </p>
        <div className="flex gap-4">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
