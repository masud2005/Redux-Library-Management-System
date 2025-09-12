
interface LoaderProps {
    title: string
}

const Loader = ({ title }: LoaderProps) => {
    return (
        <div>
            <div className="min-h-screen flex flex-col justify-center items-center">
                {/* <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div> */}
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className='mt-5'>{title} Loading...</span>
            </div>
        </div>
    );
};

export default Loader;