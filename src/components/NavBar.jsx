import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {

    // Nav items
    const navItems = [
        { name: "All Contacts", path: "/" },
        { name: "Add Contacts", path: "/addContact" }
    ];

    return (
        <div className=' md:w-4/5 mx-auto'>
            <div className="navbar bg-base-200 lg:px-8 rounded-xl">
                <div className="md:navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link className='font-semibold' to={item.path}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to='/' className="text-lg md:text-2xl font-semibold">Contact Management App</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link className='font-semibold md:ml-1'  to={item.path}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
