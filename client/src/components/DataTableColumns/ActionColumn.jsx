import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { deleteContact } from "@/utils/contactAPI";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ActionColumn({ row, model, editEndpoint, id = "" }) {
  const isActive = row.isActive;
  const { toast } = useToast();
  async function handleDelete() {
    try {
      if (model === "contact") {
        const res = await deleteContact(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast({
          title: " Deleted Successfully",
          description: `${model} Contact deleted sucessfully`,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Deletion Failed",
        description: `${model} Contact deletion failed. Please try again.`,
        variant: "destructive",
        type: "error",
      });
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive transition-all duration-500 cursor-pointer w-full justify-start"
            >
              <Trash className="w-4 h-4 flex-shrink-0" />
              <span>Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                {model}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant={"destructive"} onClick={() => handleDelete()}>
                Permanently Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenuItem>
          <Link to="#" className="flex item gap-2">
            <Pencil className="w-4 h-4 mr-2" />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
