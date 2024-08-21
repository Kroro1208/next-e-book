"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import icon from '../logo.svg'

interface HeaderProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | undefined;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link href='/' className="text-2xl font-bold">
                            Next E-BOOK
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink href="/">Home</NavLink>
                            {user ? (
                                <>
                                    <NavLink href="/profile">Profile</NavLink>
                                    <button
                                        className="text-gray-300 hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                                        onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <NavLink href="/login">Login</NavLink>
                            )}
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link href='/profile'>
                                    <Image
                                        width={50}
                                        height={50}
                                        className="rounded-full border-2 border-white"
                                        alt='profile-icon'
                                        src={user?.image || icon}
                                    />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink href="/" mobile>Home</NavLink>
                        {user ? (
                            <>
                                <NavLink href="/profile" mobile>Profile</NavLink>
                                <button
                                    className="text-gray-300 hover:bg-purple-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                                    onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavLink href="/login" mobile>Login</NavLink>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

const NavLink = ({ href, children, mobile }: { href: string; children: React.ReactNode; mobile?: boolean }) => (
    <Link href={href}
        className={`${mobile ? 'block' : 'inline-block'} text-gray-300 hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300`}>
        {children}
    </Link>
);

export default Header;