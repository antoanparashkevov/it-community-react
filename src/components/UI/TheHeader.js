import React, { useState, useEffect } from "react";
import './TheHeader.css';

const TheHeader = () => {
    
    return (
        <React.Fragment>
            <header className='header_wrapper'>
                <div className='header_title'>
                    <a href="#">IT-COMMUNITY</a>
                </div>
                <nav className='navbar_wrapper'>
                    <ul>
                        <li>
                            <a href="#" className='navbar_link'>Posters</a>
                        </li>
                        <li>
                            <a href="" className='navbar_link'>Companies</a>
                        </li>
                        <li>
                            <a href="" className='navbar_link'>Messages</a>
                        </li>
                        <li>
                            <a href="" className='navbar_link'>Sign in</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )

}

export default TheHeader;