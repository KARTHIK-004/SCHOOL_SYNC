import { Link } from "react-router-dom";
import { School, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      <Card className="w-full max-w-lg shadow-lg relative z-10 border-t-4 border-t-navy-600">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-navy-800">
            404 - Page Not Found
          </CardTitle>
          <p className="text-center  text-sm">
            The requested page could not be located
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center">
            <School className="h-20 w-20 text-navy-600" />
          </div>
          <p className="text-lg">
            We apologize, but the page you are looking for is not available.
          </p>
          <p className="text-sm">
            Please check the URL or navigate back to the main dashboard.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="outline">
            <Link to="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
