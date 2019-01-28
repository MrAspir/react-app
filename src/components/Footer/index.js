import React from 'react';

import { Copyright, Developed } from './blocks';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-sm-auto">
                        <Copyright />
                    </div>

                    <div className="col-12 col-sm-auto">
                        <Developed />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;