import { Button } from "@/components/ui/button";

export default function QuickActionButton({ title, icon, onClick }) {
  return (
    <Button
      onClick={onClick}
      className="bg-card p-4 rounded-xl shadow hover:bg-primary/10 transition-colors w-full text-left"
    >
      <div className="flex items-center space-x-3">
        <span className="text-lg">{icon === "user-plus" ? "👤" : "📢"}</span>
        <span className="font-medium">{title}</span>
      </div>
    </Button>
  );
}
