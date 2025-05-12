import React, { useState } from 'react';
import UploadImage from '../components/UploadImage';
import ClassificationResult from '../components/ClassificationResult';
import About from '../components/About';
import './Home.css'; // Importing the CSS file

const Home = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="text-center text-white text-3xl font-bold">Ore Classification System</h1>
      </header>

      <div className="content">
        <div className="upload-section">
          <UploadImage setResult={setResult} />
        </div>

        <div className="result-section mt-8">
          <ClassificationResult result={result} />
        </div>

        <div className="about-section mt-8">
          <About />
        </div>
      </div>

      <footer className="footer mt-12 text-center">
        <p className="text-gray-500">© {new Date().getFullYear()} Ore Classification AI | Built by [Your Name]</p>
      </footer>
    </div>
  );
};

export default Home;
