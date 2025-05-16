import React from 'react';
import { Alert } from './ui/alert'; // Assuming this is a Radix-style Alert

interface FlashMessagesProps {
    messages: string | string[];
    status: 'error' | 'success' | 'warning' | 'info';
}

const FlashMessages = ({ messages, status }: FlashMessagesProps) => {
    // Handle single string or array of messages
    const messageArray = Array.isArray(messages) ? messages : [messages];

    // Dinamik sınıf oluşturma
    const alertClasses = {
        error: 'm-3 p-4 border-l-4 border-red-500 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200',
        success: 'm-3 p-4 border-l-4 border-green-500 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200',
        warning: 'm-3 p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
        info: 'm-3 p-4 border-l-4 border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
    };

    return (
        <Alert variant={status} className={alertClasses[status]}>
            <div className="flex flex-col space-y-1">
                {messageArray.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </Alert>
    );
};

export default FlashMessages;
