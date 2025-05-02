import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
// Optional if Tailwind is set up globally

const Chatbot = () => {
    const [status, setStatus] = useState('');
    const [response, setResponse] = useState('');

    // Initialize socket connection
    const socket = io("http://127.0.0.1:5500"); // Adjust to your server URL

    useEffect(() => {
        // Handle incoming status updates
        socket.on('status', (data) => {
            setStatus(data.data);
        });

        // Handle incoming response updates
        socket.on('response', (data) => {
            setResponse(data.data);
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const handleStartListening = () => {
        socket.emit('start_listening');
    };

    const handleStopListening = () => {
        socket.emit('stop_listening');
    };

    const handleAskAgain = () => {
        socket.emit('stop_listening');
        socket.emit('start_listening');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Voice Assistant</h1>
            <div className="space-x-4">
                <button 
                    onClick={handleStartListening} 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Start Listening
                </button>
                <button 
                    onClick={handleStopListening} 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Stop Listening
                </button>
                <button 
                    onClick={handleAskAgain} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Ask Again
                </button>
            </div>
            <div className="mt-8 text-lg text-gray-700">
                <p className="font-medium">{status}</p>
                <p className="mt-2">{response}</p>
            </div>
        </div>
    );
};

export default Chatbot;

/* Tailwind CSS Integration */
// Ensure you have Tailwind CSS set up in your project.
// Run: npm install -D tailwindcss postcss autoprefixer
// Initialize: npx tailwindcss init
// Add Tailwind directives in your CSS file:
// @tailwind base;
// @tailwind components;
// @tailwind utilities;