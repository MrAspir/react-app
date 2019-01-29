import React from 'react';

const Developed = () => {
    const developedLink = 'https://www.linkedin.com/in/krasinskyi-roman/';

    return (
        <div className="developed">
            developed by <a className="developed__link" href={developedLink}>Roman Krasinkyi</a>
        </div>
    );
};

export default Developed;
