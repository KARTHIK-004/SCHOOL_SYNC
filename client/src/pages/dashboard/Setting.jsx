import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme/theme-provider";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Appearance</h1>
        <p className="text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>

      <Separator />

      {/* Theme Selection */}
      <div className="space-y-4">
        <div>
          <Label className="text-lg font-medium">Theme</Label>
          <p className="text-sm text-muted-foreground">
            Select the theme for the dashboard.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-2">
          {/* Light Theme Option */}
          <Card
            className={`p-4 border-2 cursor-pointer hover:border-primary ${
              theme === "light" ? "border-primary" : ""
            }`}
            onClick={() => handleThemeChange("light")}
          >
            <div className="space-y-2 rounded-lg">
              <img src="/light.png" alt="light_image" />
            </div>
            <p className="text-center pt-2">Light</p>
          </Card>

          {/* Dark Theme Option */}
          <Card
            className={`p-4 border-2 cursor-pointer hover:border-primary ${
              theme === "dark" ? "border-primary" : ""
            }`}
            onClick={() => handleThemeChange("dark")}
          >
            <div className="space-y-2 rounded-lg">
              <img src="/dark.png" alt="dark_image" />
            </div>
            <p className="text-center pt-2">Dark</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
