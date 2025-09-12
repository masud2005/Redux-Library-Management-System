import App from "@/App";
import Books from "@/pages/Books";
import BorrowBookSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Books
      },
      {
        path: '/books',
        Component: Books
      },
      {
        path: '/create-book',
        Component: CreateBook
      },
      {
        path: '/borrow-summary',
        Component: BorrowBookSummary
      },
    ]

  },
])

export default router;