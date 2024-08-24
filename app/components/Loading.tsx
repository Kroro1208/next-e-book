'use client';

import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-sky-300 to-green-300">
            <div className="relative">
                <div className="w-20 h-20 border-purple-200 border-2 rounded-full"></div>
                <div className="w-20 h-20 border-gray-900 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            </div>
            <div className="absolute text-white text-2xl font-bold animate-pulse">Loading...</div>
        </div>
    );
};

export default Loading;