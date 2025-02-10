import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Download, FileSpreadsheet } from "lucide-react";

// Component Imports
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import { Button } from "@/components/ui/button";

export default function BulkStudent() {
  // Hooks and State
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors] = useState([]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a valid CSV file",
        variant: "destructive",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fix all errors before uploading",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      // await uploadStudents(previewData);
      toast({
        title: "Success",
        description: "Students uploaded successfully!",
        variant: "success",
      });

      // navigate("/dashboard/students");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to upload students",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormHeader
        href="/students"
        parent=""
        title="Bulk Student"
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-6">
          {/* Template Download Section */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Download Template</h3>
              <p className="text-sm text-muted-foreground">
                Download our CSV template to ensure your data is formatted
                correctly
              </p>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
          </div>

          {/* File Upload Section */}
          <div className="border rounded-lg p-4">
            <label className="block space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileSpreadsheet className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      CSV files only
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </label>
          </div>
        </div>
      </div>

      <FormFooter
        href="/students"
        parent=""
        title="Bulk Student"
        loading={loading}
      />
    </form>
  );
}
