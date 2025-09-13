import Banner from "@/components/layout/Banner";
import Loader from "@/components/layout/Loader";
import BookRow from "@/components/module/books/BookRow";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {
    const [sort, setSort] = useState("desc");
    const [genre, setGenre] = useState("");


    const { data, isLoading, isError } = useGetBooksQuery({
        sort,
        sortBy: "createdAt",
        filter: genre,
    });

    const books = data?.data || [];

    if (isLoading) {
        return <Loader title={"Books"} />;
    }
    if (isError) {
        return <div className="text-red-500 text-center py-10">Error loading books. Please try again later.</div>;
    }


    return (
        <div className="container mx-auto px-4 my-10">
            <Banner />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 ">
                <h1 className="text-2xl font-bold mb-4 md:mb-0 text-gray-800 dark:text-gray-100">
                    <span>📚</span> <span className="text-blue-600 dark:text-yellow-400">Total Books {books?.length}</span>
                </h1>

                <div className="flex flex-row wrap items-stretch md:items-center gap-4 w-full md:w-auto">
                    {/* Sort by */}
                    <Select onValueChange={(value) => setSort(value)} defaultValue="desc">
                        <SelectTrigger className="sm:w-[180px]">
                            <SelectValue placeholder="Sort by date" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">Newest First</SelectItem>
                            <SelectItem value="asc">Oldest First</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Filter by Genre */}
                    <Select
                        onValueChange={(value) => {
                            if (value === "ALL") {
                                setGenre(""); //clears filter
                            } else {
                                setGenre(value);
                            }
                        }}
                    >
                        <SelectTrigger className="sm:w-[180px]">
                            <SelectValue placeholder="Filter by genre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All</SelectItem>
                            <SelectItem value="FICTION">Fiction</SelectItem>
                            <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                            <SelectItem value="SCIENCE">Science</SelectItem>
                            <SelectItem value="HISTORY">History</SelectItem>
                            <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                            <SelectItem value="FANTASY">Fantasy</SelectItem>
                        </SelectContent>
                    </Select>

                    <Link to="/create-book" className="w-full md:w-auto">
                        <Button>Add Book</Button>
                    </Link>
                </div>
            </div>
            {
                books.length === 0 ? <>
                    <div className="text-center md:text-lg py-10 text-gray-500">No books available at the moment.</div>
                </> :
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <Table className="min-w-full divide-y divide-gray-200 border">
                            <TableHeader className="">
                                <TableRow className="bg-gray-200 dark:bg-gray-900 text-gray-500 uppercase tracking-wider text-sm">
                                    <TableHead className="px-6 py-3 text-left font-bold text-base text-gray-800 dark:text-gray-100">Title</TableHead>
                                    <TableHead className="px-6 py-3 text-left font-bold text-base text-gray-800 dark:text-gray-100">Author</TableHead>
                                    <TableHead className="px-6 py-3 text-left font-bold text-base text-gray-800 dark:text-gray-100">Genre</TableHead>
                                    <TableHead className="px-6 py-3 text-left font-bold text-base text-gray-800 dark:text-gray-100">ISBN</TableHead>
                                    <TableHead className="px-6 py-3 font-bold text-base text-gray-800 dark:text-gray-100 text-center">Copies</TableHead>
                                    <TableHead className="px-6 py-3 font-bold text-base text-gray-800 dark:text-gray-100 text-center">Availability</TableHead>
                                    <TableHead className="px-6 py-3 font-bold text-base text-gray-800 dark:text-gray-100 text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-200">
                                {
                                    books.map((book: IBook) => <BookRow book={book} key={book._id} />)
                                }
                            </TableBody>
                        </Table>
                    </div>
            }

        </div>
    );
};

export default Books;