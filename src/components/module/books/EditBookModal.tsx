import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useUpdateBookMutation } from "@/redux/api/baseApi"
import type { IBook } from "@/types"
import { Edit } from "lucide-react"
import { useState } from "react"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"

interface IBookProps {
    book: IBook
}

export function EditBookModal({ book }: IBookProps) {
    const form = useForm({
        defaultValues: {
            title: book.title,
            author: book.author,
            genre: book.genre,
            isbn: book.isbn,
            description: book.description,
            copies: book.copies,
        },
    });
    const [open, setOpen] = useState(false)

    const [updateBook] = useUpdateBookMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(book._id);
        try {
            await updateBook({ bookId: book._id, book: data })
            setOpen(false)
            toast.success("Book updated successfully!");
        } catch (error) {
            console.error("Failed to update book:", error);
            toast.error("Failed to update book. Please try again.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <TooltipProvider>
                    <Tooltip>
                        <DialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Button variant="outline" className=" outline-blue-600" size="icon">
                                    <Edit className="h-4 w-4 text-blue-600" />
                                </Button>
                            </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent>
                            <p>Edit Book</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl text-blue-600 dark:text-yellow-300">
                            <Edit />
                            <span className="">Edit Book</span>
                        </DialogTitle>
                        <DialogDescription>
                            Make changes to the book details here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* genre */}
                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>💠 Genre</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="FICTION">Fiction</SelectItem>
                                                <SelectItem value="NON_FICTION">
                                                    Non-Fiction
                                                </SelectItem>
                                                <SelectItem value="SCIENCE">Science</SelectItem>
                                                <SelectItem value="HISTORY">History</SelectItem>
                                                <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                                                <SelectItem value="FANTASY">Fantasy</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isbn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ISBN</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="copies"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Copies</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="text-right">
                                <Button type="submit">Update Book</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </form>
        </Dialog>
    )
}