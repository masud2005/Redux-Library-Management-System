import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { path: "/books", label: "All Books" },
        { path: "/create-book", label: "Add Book" },
        { path: "/borrow-summary", label: "Borrow Summary" },
    ];

    return (
        <nav className="sticky top-0 z-50  backdrop-blur-md shadow-sm transition-colors duration-300 border-b bg-gray-400/30 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl font-bold text-blue-600 dark:text-yellow-300 transition-colors duration-300"
                >
                    📚 Library
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-600 dark:text-yellow-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-yellow-300 after:transition-transform after:scale-x-100 font-semibold"
                                    : "text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-yellow-300 after:transition-transform after:scale-x-0 hover:after:scale-x-100"
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <ModeToggle />
                </div>

                {/* Mobile Toggle Button */}
                <div className="md:hidden flex items-center gap-4">
                    <ModeToggle />
                    <button
                        className="text-gray-700 dark:text-gray-200"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-background/80 px-4 py-3 space-y-4 shadow-sm transition-all duration-300">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? "block text-blue-600 dark:text-yellow-300 font-semibold"
                                    : "block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-300 transition-colors"
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;