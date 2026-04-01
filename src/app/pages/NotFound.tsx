import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <FileQuestion className="w-24 h-24 mx-auto text-gray-400" />
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">Page Not Found</h1>
            <p className="text-gray-500">
              The page you're looking for doesn't exist.
            </p>
          </div>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
