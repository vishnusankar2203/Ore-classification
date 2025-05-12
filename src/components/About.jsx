import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About This Project</h1>
            <p className="about-description">
                This project is designed to classify ore images using machine learning. It helps in identifying ore types with confidence levels, providing a valuable tool for geological and industrial purposes.
            </p>
        </div>
    );
};

export default About;
