import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { IBook } from "@/types";
import { Book, Calendar, Info, LibraryBig } from "lucide-react";

interface IBookViewProps {
    book: IBook;
}

export function ViewBookModal({ book }: IBookViewProps) {
    return (
        <Dialog>
            <TooltipProvider>
                <Tooltip>
                    <DialogTrigger asChild >
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Info className="h-4 w-4 text-yellow-600" />
                            </Button>
                        </TooltipTrigger>
                    </DialogTrigger>
                    <TooltipContent>
                        <p>Book Details</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl text-blue-600 dark:text-yellow-300">
                        <Book />
                        <span className="">Book Details</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-4 py-2">
                    {/* Title */}
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 w-24">Title:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-300">{book.title}</span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 w-24">Author:</span>
                        <span className="text-gray-800 dark:text-gray-300">{book.author}</span>
                    </div>

                    {/* Genre */}
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 w-24">Genre:</span>
                        <span className="text-gray-800 dark:text-gray-300 capitalize">{book.genre.toLowerCase()}</span>
                    </div>

                    {/* ISBN */}
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 w-24">ISBN:</span>
                        <span className="text-gray-800 dark:text-gray-300">{book.isbn}</span>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col space-y-2">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">Description:</span>
                        <p className="text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                            {book.description}
                        </p>
                    </div>

                    <Separator className="my-2" />

                    {/* Copies & Availability */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <LibraryBig className="h-4 w-4 text-gray-800 dark:text-gray-200" />
                            <span className="font-semibold text-gray-800 dark:text-gray-200">Copies:</span>
                            <span className="text-gray-800 dark:text-gray-300 font-medium">{book.copies}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${book.copies > 0 ? "bg-green-500" : "bg-red-500"}`}
                            />
                            <span className="text-sm font-semibold">
                                {book.copies > 0 ? "Available" : "Unavailable"}
                            </span>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Created: {new Date(book.createdAt || "").toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Updated: {new Date(book.updatedAt || "").toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}