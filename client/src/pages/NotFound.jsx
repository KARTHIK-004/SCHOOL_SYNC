import { Link } from "react-router-dom";
import { ArrowLeft, BookX, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className="rounded-full bg-muted p-6 mb-6">
            <BookX className="h-16 w-16 text-primary" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-2">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved. Please
            check the URL or navigate back to the home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="outline" onClick={handleGoBack}>
              <span>
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
              </span>
            </Button>
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
