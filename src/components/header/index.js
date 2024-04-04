import React from 'react'
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand me-5" href="/">
                        Admin Panel
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item active ">
                                <Link className="nav-link" to="/"> Category
                                </Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/quizlist"> Contest
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/"> Dashboard
                            </Link>
                            </li>
                        </ul>
                        {/* <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-outline-secondary my-2 my-sm-0"
                                type="submit"
                            >
                                Search
                            </button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}