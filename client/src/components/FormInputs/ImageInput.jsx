import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ImageInput = ({
  title,
  imageUrl,
  setImageUrl,
  endpoint,
  className,
  toolTipText,
  size = "lg",
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium">{title}</Label>
        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                >
                  <CircleHelp className="w-4 h-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="items-center">
          <CardTitle> </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <img
              alt={title}
              height="500"
              className={cn(
                size === "sm" ? "h-20" : "h-40",
                "w-full rounded-md object-cover",
                className
              )}
              src={imageUrl}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const fileUrl = URL.createObjectURL(file);
                  setImageUrl(fileUrl);

                  if (endpoint) {
                    const formData = new FormData();
                    formData.append("file", file);

                    fetch(endpoint, {
                      method: "POST",
                      body: formData,
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log("Upload successful:", data);
                        if (data.url) {
                          setImageUrl(data.url);
                        }
                      })
                      .catch((error) => {
                        alert(`ERROR! ${error.message}`);
                        console.error("Upload error:", error);
                      });
                  }
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageInput;
