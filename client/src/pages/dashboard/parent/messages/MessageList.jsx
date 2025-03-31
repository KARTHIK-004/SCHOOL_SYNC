import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Pencil, Plus, Trash, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MessageList({
  messages = [],
  selectedMessage,
  onSelect,
  isLoading,
  searchQuery = "",
  setSearchQuery,
  isMobile = false,
}) {
  return (
    <div
      className={isMobile ? "" : "hidden md:block w-80 border-r bg-background"}
    >
      <div className="px-4 h-full flex flex-col">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="Compose new message"
          >
            <Link to="/dashboard/messages/compose">
              <Plus className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <Input
          type="search"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="my-3"
          aria-label="Search messages"
        />
        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : messages.length > 0 ? (
            <ul className="space-y-1">
              {messages.map((message) => (
                <li key={message._id}>
                  <div className="relative group">
                    <button
                      className={`block w-full text-left p-3 rounded-lg transition ${
                        selectedMessage?._id === message._id
                          ? "bg-primary/10"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => onSelect(message)}
                      aria-label={`Select message: ${message.subject}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          {message.isStarred && (
                            <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          )}
                          <h3 className="text-base font-medium truncate">
                            {message.subject}
                          </h3>
                          {message.unread && (
                            <span className="ml-2 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <span className="truncate">{message.sender}</span>
                          <span className="mx-1 flex-shrink-0">•</span>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {message.date}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {message.preview}
                        </p>
                      </div>
                    </button>
                    <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        aria-label="Reply to message"
                      >
                        <Link to={`/dashboard/messages/reply/${message._id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete message"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center p-4">No messages found</div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
