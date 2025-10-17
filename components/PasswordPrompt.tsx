import React, { useState, FormEvent } from 'react';

interface PasswordPromptProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({ onSuccess, onCancel }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (password === '483759') {
            onSuccess();
        } else {
            setError('Mật khẩu không đúng. Vui lòng thử lại.');
            setPassword('');
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in"
            onClick={onCancel}
        >
            <div 
                className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-sm border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-2 text-gray-100">Xác thực quyền truy cập</h2>
                <p className="text-gray-400 mb-6">Vui lòng nhập mật khẩu để tiếp tục.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Nhập mật khẩu..."
                        autoFocus
                    />
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    <div className="flex justify-end gap-4 mt-6">
                         <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordPrompt;