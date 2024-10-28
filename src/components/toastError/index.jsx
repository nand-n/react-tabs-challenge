
import React, { useEffect } from 'react';
import './toastError.css';

const ToastError = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast-error">
            {message?.toString()}
        </div>
    );
};

export default ToastError;
