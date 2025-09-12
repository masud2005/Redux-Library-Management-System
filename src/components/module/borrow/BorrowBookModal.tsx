import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { format } from "date-fns";
import { Book, CalendarIcon, ShoppingBag } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IBorrowBookModalProps {
    book: IBook;
}

const BorrowBookModal = ({ book }: IBorrowBookModalProps) => {
    // console.log(book.copies);
    const navigate = useNavigate();
    const [borrowBook, { isLoading }] = useBorrowBookMutation();
    const form = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { quantity, dueDate } = data;

        // Check if quantity exceeds available copies
        if (quantity > book.copies) {
            toast.error(`Sorry, only ${book.copies} copies are available.`);
            return;
        }

        const borrowData = {
            book: book._id,
            quantity: Number(quantity),
            dueDate: dueDate.toISOString(),
        };

        try {
            await borrowBook(borrowData).unwrap();
            toast.success("Book successfully borrowed!");
            navigate("/borrow-summary");
        } catch (error) {
            console.error("Failed to borrow book:", error);
            toast.error("Failed to borrow book. Please try again.");
        }
    }

    return (
        <Dialog>
            <div className={cn(book.copies === 0 && "cursor-not-allowed")}>
                <TooltipProvider>
                    <Tooltip>
                        <DialogTrigger asChild disabled={book.copies === 0}>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <ShoppingBag className="h-4 w-4 text-green-500" />
                                </Button>
                            </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent>
                            <p>Borrow Book</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            {/* <DialogTitle className="text-2xl">Borrow Book</DialogTitle> */}
                            <DialogTitle className="flex items-center gap-2 text-2xl text-blue-600 dark:text-yellow-300 mb-2">
                                <Book /> Borrow Book
                            </DialogTitle>
                            <DialogDescription className="text-base">
                                Fill in the details to borrow **"{book?.title}"**.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                            {/* Quantity Field */}
                            <FormField
                                control={form.control}
                                name="quantity"
                                rules={{
                                    required: "Quantity is required.",
                                    min: {
                                        value: 1,
                                        message: "Quantity must be at least 1."
                                    },
                                    max: {
                                        value: book.copies,
                                        message: `Quantity cannot exceed available copies (${book.copies}).`
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter quantity"
                                                min={1}
                                                max={book.copies}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Due Date Field */}
                            <FormField
                                control={form.control}
                                name="dueDate"
                                rules={{ required: "Due date is required." }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    captionLayout="dropdown"
                                                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="mt-4">
                            <Button type="submit" disabled={isLoading}>
                                Borrow Book
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default BorrowBookModal;