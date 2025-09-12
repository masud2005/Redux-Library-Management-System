import Loader from "@/components/layout/Loader";
import BorrowBookRow from "@/components/module/borrow/BorrowBookRow";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";

const BorrowBookSummary = () => {
    const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);

    if (isLoading) {
        return <Loader title="Borrow summary" />;
    }

    if (isError) {
        return <p className="text-red-500 text-center mt-10">Failed to fetch data.</p>;
    }

    const borrowSummary = data?.data || [];

    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                {/* <span>📚</span> <span className=" text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Borrow Summary</span> */}
                <span>📚</span> <span className="text-blue-600 dark:text-yellow-400">Borrow Summary</span>
            </h1>
            {borrowSummary.length === 0 ? (
                <div className="flex justify-center items-center h-[50vh] flex-col">
                    <p className="text-center text-lg text-gray-500">No books have been borrowed yet. </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <Table className="min-w-full divide-y divide-gray-200 border">
                        <TableHeader>
                            <TableRow className="bg-gray-200 dark:bg-gray-900 text-gray-500 uppercase tracking-wider text-sm ">
                                <TableHead className="px-6 py-3 text-left font-bold text-base md:text-lg text-gray-800 dark:text-gray-100">Title</TableHead>
                                <TableHead className="px-6 py-3 text-left font-bold text-base md:text-lg text-gray-800 dark:text-gray-100">ISBN</TableHead>
                                <TableHead className="px-6 py-3 text-center font-bold text-base md:text-lg text-gray-800 dark:text-gray-100">Total Quantity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {borrowSummary.map((item: any, index: number) => (
                                <BorrowBookRow item={item} key={index} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default BorrowBookSummary;