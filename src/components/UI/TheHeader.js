import React  from "react";
import { Link } from "react-router-dom";
import './TheHeader.css';

const TheHeader = () => {
    
    return (
        <React.Fragment>
            <header className='header_wrapper'>
                <div className='header_title'>
                    <Link to="/">IT-COMMUNITY</Link>
                </div>
                <nav className='navbar_wrapper'>
                    <ul>
                        <li>
                            <Link to="/posters" className='navbar_link'>Posters</Link>
                        </li>
                        <li>
                            <Link to="/companies" className='navbar_link'>Companies</Link>
                        </li>
                        <li>
                            <Link to="/messages" className='navbar_link'>Messages</Link>
                        </li>
                        <li>
                            <Link to="/" className='navbar_link'>Sign in</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default TheHeader;