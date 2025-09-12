import Loader from "@/components/layout/Loader";
import BookRow from "@/components/module/books/BookRow";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { Link } from "react-router";

const Books = () => {
    const { data, isLoading, isError } = useGetBooksQuery(undefined);

    const books = data?.data || [];

    if (isLoading) {
        return <Loader title={"Books"} />;
    }
    if (isError) {
        return <div className="text-red-500 text-center py-10">Error loading books. Please try again later.</div>;
    }
    if (books.length === 0) {
        return <div className="text-center py-10 text-gray-500">No books available at the moment.</div>;
    }

    return (
        <div className="container mx-auto px-4 mt-10">
            <div className="text-3xl font-bold mb-6 text-center flex justify-between">
                <h1><span>📚</span> <span className="text-blue-600 dark:text-yellow-400">All Books</span></h1>
                <Link to="/create-book"><Button className="bg-blue-600 dark:bg-yellow-300 hover:bg-blue-700">Add Book</Button></Link>
            </div>
            <div className="overflow-x-auto rounded-lg shadow-md">
                <Table className="min-w-full divide-y divide-gray-200 border">
                    <TableHeader className="">
                        <TableRow className="bg-gray-200 dark:bg-gray-900 text-gray-500 uppercase tracking-wider text-sm  ">
                            <TableHead className="px-6 py-3 text-left font-bold text-base md:text-lg text-gray-800 dark:text-gray-100">Title</TableHead>
                            <TableHead className="px-6 py-3 text-left font-bold text-base md:text-lg text-gray-800 dark:text-gray-100">Author</TableHead>
                            <TableHead className="px-6 py-3 text-left font-bold text-base md:text-lg text-gray-800 dark:text-gray-100">Genre</TableHead>
                            <TableHead className="px-6 py-3 text-left font-bold text-base md:text-lg text-gray-800 dark:text-gray-100">ISBN</TableHead>
                            <TableHead className="px-6 py-3 font-bold text-base md:text-lg text-gray-800 dark:text-gray-100 text-center">Copies</TableHead>
                            <TableHead className="px-6 py-3 font-bold text-base md:text-lg text-gray-800 dark:text-gray-100 text-center">Availability</TableHead>
                            <TableHead className="px-6 py-3 font-bold text-base md:text-lg text-gray-800 dark:text-gray-100 text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className=" divide-y divide-gray-200">
                        {
                            books.map((book: IBook) => <BookRow book={book} key={book._id} />)
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Books;