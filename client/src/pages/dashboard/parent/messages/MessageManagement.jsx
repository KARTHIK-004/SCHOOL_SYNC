import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import MessageList from "./MessageList";
import MessageDetails from "./MessageDetails";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/utils/authAPI";
// import { getAllMessages } from "@/utils/messageAPI";

export default function MessageManagement() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        // const response = await getAllMessages(userData);
        // const messages = response.data.data;
        // setMessages(messages);
        // if (messages.length > 0) {
        //   setSelectedMessage(messages[0]);
        // }
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          variant: "destructive",
          title: "Error fetching messages",
          description: error.message || "Please try again later.",
        });
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Filter messages based on search query
  const filteredMessages = messages.filter(
    (msg) =>
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler for selecting a message
  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    setIsSheetOpen(false);
  };

  return (
    <div className="flex h-full w-full relative">
      {/* Mobile Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="md:hidden absolute top-6 right-4 z-50"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-4">
          <SheetHeader>
            <SheetTitle>Message Navigation</SheetTitle>
            <SheetDescription>Browse and manage messages</SheetDescription>
          </SheetHeader>
          <MessageList
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            messages={filteredMessages}
            selectedMessage={selectedMessage}
            onSelect={handleSelectMessage}
            isLoading={isLoading}
            isMobile
          />
        </SheetContent>
      </Sheet>

      {/* Sidebar (Desktop) */}
      <MessageList
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        messages={filteredMessages}
        selectedMessage={selectedMessage}
        onSelect={handleSelectMessage}
        isLoading={isLoading}
      />

      {/* Main Content */}
      <div className="flex-1 h-full overflow-hidden">
        <MessageDetails
          selectedMessage={selectedMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
