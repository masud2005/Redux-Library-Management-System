import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, User, SquareGanttChart, KeyRound, Box } from "lucide-react";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateBook = () => {
    const form = useForm();
    const [createBook] = useCreateBookMutation()
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data);
        const bookData = {
            ...data,
            available: data.copies > 0 ? true : false
        }
        console.log(bookData);
        try {
            await createBook(bookData).unwrap();
            form.reset();
            toast.success("Successfully added the new book!");
            navigate("/books");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add the book. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center my-10 px-4">
            <Card className="w-full max-w-xl">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-blue-600 dark:text-yellow-300">Add a New Book</CardTitle>
                    <CardDescription>
                        Fill in the details below to add a new book to your library.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* title */}
                            <FormField
                                control={form.control}
                                name="title"
                                rules={{ required: "Title is required." }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Book className="h-4 w-4 text-gray-500" />
                                            Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., The Lord of the Rings" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-left mt-0.5" />
                                    </FormItem>
                                )}
                            />

                            {/* author */}
                            <FormField
                                control={form.control}
                                name="author"
                                rules={{ required: "Author is required." }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-gray-500" />
                                            Author
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., J.R.R. Tolkien" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-left mt-0.5" />
                                    </FormItem>
                                )}
                            />

                            {/* genre */}
                            <FormField
                                control={form.control}
                                name="genre"
                                rules={{ required: "Genre is required." }}
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="flex items-center gap-2">
                                            <Book className="h-4 w-4 text-gray-500" />
                                            Genre
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a genre" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="FICTION">Fiction</SelectItem>
                                                <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                                                <SelectItem value="SCIENCE">Science</SelectItem>
                                                <SelectItem value="HISTORY">History</SelectItem>
                                                <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                                                <SelectItem value="FANTASY">Fantasy</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-left mt-0.5" />
                                    </FormItem>
                                )}
                            />

                            {/* isbn */}
                            <FormField
                                control={form.control}
                                name="isbn"
                                rules={{ required: "ISBN is required." }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <KeyRound className="h-4 w-4 text-gray-500" />
                                            ISBN
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="e.g., 978-0-618-05326-7" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-left mt-0.5" />
                                    </FormItem>
                                )}
                            />

                            {/* description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <SquareGanttChart className="h-4 w-4 text-gray-500" />
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., A classic high fantasy novel." {...field} />
                                        </FormControl>
                                        <FormMessage className="text-left mt-0.5" />
                                    </FormItem>
                                )}
                            />

                            {/* copies */}
                            <FormField
                                control={form.control}
                                name="copies"
                                rules={{
                                    required: "Copies are required.",
                                    min: {
                                        value: 1,
                                        message: "Copies must be at least 1."
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Box className="h-4 w-4 text-gray-500" />
                                            Copies
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                placeholder="e.g., 5"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-left mt-0.5" />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">Create Book</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateBook;