import React from 'react';

import Header from './Header';
import CitiesPage from './CitiesPage';
import Footer from "./Footer";

const App = () => {
    return (
        <div className="wrapper">
            <Header />

            <div className="main">
                <div className="container">
                    <div className="row">
                        <CitiesPage />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default App;