"use client";

import Image from "next/image";
import Link from "next/link";
import React from 'react';
import icon from '../favicon.ico'

const Header = () => {
    return (
        <header className="bg-slate-600 text-gray-200 shadow-lg">
            <nav className=" flex items-center justify-between p-4">
                <Link href='/'>
                    Next E-BOOK
                </Link>
                <div className="flex items-center gap-1">
                    <Link href='/' className="text-gray-400 hover:text-gray-700 px-3 py-2 rounded-lg text-sm font-medium">
                        Home
                    </Link>
                    <Link href='/login' className="text-gray-400 hover:text-gray-700 px-3 py-2 rounded-lg text-sm font-medium">
                        Login
                    </Link>
                    <Link href='/profile'>
                        <Image width={50} height={50} alt='profile-icon' src={icon} />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;