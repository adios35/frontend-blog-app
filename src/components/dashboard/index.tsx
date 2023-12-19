import React from "react";
import { Link } from "react-router-dom";
import { MdHome, MdDashboard } from "react-icons/md"; // Importing icons from react-icons

const Dashboard = () => {
    return (
        <div className="flex min-h-screen pt-20">
            {/* Left Sidebar */}
            <nav className="bg-gray-800 text-white w-16 hidden md:block">
                {/* Navigation Items */}
                <ul className="py-4">
                    <li className="mb-4">
                        <Link to="/" className="block p-2 text-center hover:bg-gray-700">
                            <MdHome size={24} /> {/* Home icon */}
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/dashboard" className="block p-2 text-center hover:bg-gray-700">
                            <MdDashboard size={24} /> {/* Dashboard icon */}
                        </Link>
                    </li>
                    {/* Add more navigation items here */}
                </ul>
            </nav>

            {/* Content Area */}
            <div className="flex-1 bg-gray-900 p-8">
                {/* Main Content */}
                <h1 className="text-3xl text-white mb-4">Dashboard</h1>
                {/* Form */}
                <form className="bg-white p-4 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Content</label>
                        <textarea
                            placeholder="Enter Content"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            rows={4}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none"
                    >
                        Create Article
                    </button>
                </form>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="bg-gray-800 text-white w-full fixed top-16 left-0 md:hidden">
                {/* Navigation Items */}
                <ul className="flex justify-between py-2 px-4">
                    <li>
                        <Link to="/" className="block p-2 text-center hover:bg-gray-700">
                            <MdHome size={24} /> {/* Home icon */}
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="block p-2 text-center hover:bg-gray-700">
                            <MdDashboard size={24} /> {/* Dashboard icon */}
                        </Link>
                    </li>
                    {/* Add more navigation items here */}
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;
