import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { Delete } from "lucide-react";
import toast from "react-hot-toast";
import BorrowBookModal from "../borrow/BorrowBookModal";
import { EditBookModal } from "./EditBookModal";
import { ViewBookModal } from "./ViewBookModal";

interface IBookTableProps {
    book: IBook;
}

const BookRow = ({ book }: IBookTableProps) => {
    const { title, author, genre, isbn, copies, _id } = book;

    const [deleteBook] = useDeleteBookMutation();

    const handleDelete = async (id: string) => {
        try {
            await deleteBook(id);
            toast.success("Book deleted successfully!");
        } catch (error) {
            console.error("Failed to delete book:", error);
            toast.error("Failed to delete the book. Please try again.");
        }
    }

    return (
        <TableRow className=" transition-colors duration-200 ease-in-ou">
            <TableCell className="px-6 py-4 whitespace-nowrap table-cell font-medium text-gray-900 dark:text-gray-200 text-sm md:text-[15px]">{title}</TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap table-cell text-gray-500 dark:text-gray-300 text-sm md:text-[15px]">{author}</TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap table-cell text-gray-500 dark:text-gray-300 text-sm md:text-[15px]">{genre}</TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap table-cell text-gray-500 dark:text-gray-300 text-sm md:text-[15px]">{isbn}</TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap table-cell text-center text-gray-500 dark:text-gray-300 text-sm md:text-[15px]">{copies}</TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap table-cell text-center text-sm md:text-[15px]">
                <span className={cn(
                    "font-semibold text-sm px-2 py-1 rounded-full",
                    {
                        "bg-green-100 dark:bg-gray-800 text-green-800 dark:text-green-500": copies > 0,
                        "bg-red-100 dark:bg-gray-800 text-red-800 dark:text-red-500": copies === 0,
                    }
                )}>
                    {copies > 0 ? "Available" : "Unavailable"}
                </span>
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap table-cell text-center">
                <div className="flex justify-center items-center gap-2">
                    {/* View */}
                    <ViewBookModal book={book} />

                    {/* Edit */}
                    <EditBookModal book={book} />

                    {/* Borrow */}
                    <BorrowBookModal book={book} />

                    {/* Delete */}
                    <AlertDialog>
                        <TooltipProvider>
                            <Tooltip>
                                <AlertDialogTrigger asChild>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Delete className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </TooltipTrigger>
                                </AlertDialogTrigger>
                                <TooltipContent>
                                    <p>Delete Book</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the book data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(_id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default BookRow;