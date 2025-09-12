import { TableCell, TableRow } from '@/components/ui/table';

interface BorrowBookRowProps {
    item: {
        book: {
            title: string;
            isbn: string;
        };
        totalQuantity: number;
    };
}

const BorrowBookRow = ({ item }: BorrowBookRowProps) => {
    return (
        <TableRow className=" transition-colors duration-200 ease-in-out">
            {/* Desktop View */}
            <TableCell className="px-6 py-4 whitespace-nowrap table-cell font-medium text-gray-800 dark:text-gray-300 text-base ">
                {item.book?.title}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap table-cell text-gray-800 dark:text-gray-300 text-base ">
                {item.book.isbn}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap table-cell text-center text-gray-800 dark:text-gray-300 text-base ">
                {item.totalQuantity}
            </TableCell>
        </TableRow>
    );
};

export default BorrowBookRow;