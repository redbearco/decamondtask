interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-950">
            <div className="bg-gray-300 shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto grid grid-cols-1 gap-4 justify-items-center text-center">{children}</div>
        </div>
    );
};
