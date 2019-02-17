import React from 'react';

import BackgroundSlider from 'react-background-slider'

import Header from './Header';
import CitiesPage from './CitiesPage';
import Footer from './Footer';

import slide1 from '../images/slide1.jpg'
import slide2 from '../images/slide2.jpg'
import slide3 from '../images/slide3.jpg'
import slide4 from '../images/slide4.jpg'

const App = () => {
    return (
        <div className="wrapper">
            <BackgroundSlider images={[slide1, slide2, slide3, slide4]} duration={10} transition={2} />

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
