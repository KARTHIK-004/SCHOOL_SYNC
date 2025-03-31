import {
  Reply,
  Star,
  Trash,
  Download,
  Clock,
  User,
  Tag,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MessageDetails({ selectedMessage, isLoading }) {
  if (!selectedMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <p className="text-muted-foreground">
          {isLoading ? "Loading messages..." : "No message selected"}
        </p>
        {!isLoading && (
          <Button asChild>
            <Link to="/dashboard/messages/compose">Compose a new message</Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <header className="border-b bg-background">
        <div className="container flex flex-col sm:flex-row h-auto sm:h-16 items-start sm:items-center justify-between p-4">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h1 className="text-2xl font-semibold">
              {selectedMessage.subject}
            </h1>
            <Breadcrumb className="hidden sm:block lg:block md:hidden mt-1">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/messages">
                    Messages
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedMessage.subject}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" aria-label="Star message">
              <Star className="h-4 w-4 mr-2" />
              Star
            </Button>
            <Button size="sm" variant="ghost" aria-label="Delete message">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button size="sm" asChild aria-label="Reply to message">
              <Link to={`/dashboard/messages/reply/${selectedMessage._id}`}>
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <ScrollArea className="h-[calc(100vh-9rem)]">
        <main className="p-4 lg:p-6">
          <Card className="mb-6">
            <CardContent className="p-4 md:p-6">
              {isLoading ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-start gap-4 mb-4 md:mb-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={selectedMessage.senderAvatar}
                          alt={selectedMessage.sender}
                        />
                        <AvatarFallback>
                          {selectedMessage.sender.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-lg font-medium">
                          {selectedMessage.sender}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          To: {selectedMessage.recipients?.join(", ") || "Me"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{selectedMessage.date}</span>
                      </div>
                      {selectedMessage.isStarred && (
                        <Badge variant="outline" className="mt-1">
                          <Star className="h-3 w-3 mr-1 text-amber-500" />
                          Starred
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="prose max-w-none">
                    {selectedMessage.content}
                  </div>
                  {selectedMessage.attachments &&
                    selectedMessage.attachments.length > 0 && (
                      <div className="mt-6 border-t pt-4">
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <Paperclip className="h-4 w-4 mr-2" />
                          Attachments ({selectedMessage.attachments.length})
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedMessage.attachments.map(
                            (attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center p-2 border rounded-md"
                              >
                                <div className="flex-1 truncate">
                                  <p className="text-sm font-medium truncate">
                                    {attachment.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {attachment.size}
                                  </p>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoading ? (
              [1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-32" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Message Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">
                          <User className="h-4 w-4 inline mr-2" />
                          From:
                        </span>
                        <span className="font-medium">
                          {selectedMessage.sender}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">
                          <User className="h-4 w-4 inline mr-2" />
                          To:
                        </span>
                        <span className="font-medium">
                          {selectedMessage.recipients?.join(", ") || "Me"}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">
                          <Clock className="h-4 w-4 inline mr-2" />
                          Date:
                        </span>
                        <span className="font-medium">
                          {selectedMessage.date}
                        </span>
                      </div>
                      {selectedMessage.threadId && (
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">Thread:</span>
                          <Badge variant="outline">
                            #{selectedMessage.threadId}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Message Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">Read:</span>
                        <Badge
                          variant={
                            !selectedMessage.unread ? "default" : "outline"
                          }
                          className="w-16 justify-center"
                        >
                          {!selectedMessage.unread ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <span className="text-muted-foreground">Starred:</span>
                        <Badge
                          variant={
                            selectedMessage.isStarred ? "default" : "outline"
                          }
                          className="w-16 justify-center"
                        >
                          {selectedMessage.isStarred ? "Yes" : "No"}
                        </Badge>
                      </div>
                      {selectedMessage.labels &&
                        selectedMessage.labels.length > 0 && (
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <span className="text-muted-foreground">
                              <Tag className="h-4 w-4 inline mr-2" />
                              Labels:
                            </span>
                            <div className="flex flex-wrap gap-1 justify-end">
                              {selectedMessage.labels.map((label, index) => (
                                <Badge key={index} variant="secondary">
                                  {label}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      {selectedMessage.attachments && (
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <span className="text-muted-foreground">
                            <Paperclip className="h-4 w-4 inline mr-2" />
                            Attachments:
                          </span>
                          <Badge
                            variant={
                              selectedMessage.attachments.length > 0
                                ? "default"
                                : "outline"
                            }
                          >
                            {selectedMessage.attachments.length || 0}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {selectedMessage?.replyHistory &&
            selectedMessage.replyHistory.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Previous Messages</h3>
                <div className="space-y-4">
                  {selectedMessage.replyHistory.map((reply, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={reply.senderAvatar}
                                alt={reply.sender}
                              />
                              <AvatarFallback>
                                {reply.sender.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {reply.sender}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {reply.date}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="pl-10 prose-sm max-w-none text-muted-foreground">
                          {reply.content}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
        </main>
      </ScrollArea>
    </>
  );
}
