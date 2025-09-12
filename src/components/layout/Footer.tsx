
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 text-center">
                <p className="text-lg">
                    &copy; {new Date().getFullYear()} Minimal Library Management System. All rights reserved.
                </p>
                <p className="text-base mt-2 text-gray-400">
                    Designed and Developed by [Md. Masud Rana]
                </p>
            </div>
        </footer>
    );
};

export default Footer;