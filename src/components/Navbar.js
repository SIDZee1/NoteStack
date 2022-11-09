import React from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
    let history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem('token')
        history.push("/login")
        props.showAlert("Signed Out successfully.", "success")
    }

    return (
        <nav  className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NoteStack</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li> */}
                        <li className="nav-item" style={{marginRight: 0}}>
                            <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact Us</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem('token') ?
                        <form className="d-flex">
                            <Link style={{backgroundColor: 'grey'}} className="btn btn-success mx-2" to="/login" role="button">Sign In</Link>
                            <Link style={{backgroundColor: 'grey'}} className="btn btn-secondary mx-2" to="/signup" role="button">Sign Up</Link>
                        </form> :
                        <button style={{backgroundColor: 'grey'}} className="btn btn-danger" onClick={handleLogout}>Sign Out</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
