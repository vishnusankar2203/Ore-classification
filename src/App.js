import React, { useState } from 'react';
import './App.css'; // Importing CSS for styling
import UploadImage from './components/UploadImage';
import ClassificationResult from './components/ClassificationResult';

function App() {
  const [result, setResult] = useState(null);

  // Function to handle the result from the image upload
  const handleUpload = (data) => {
    setResult(data);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Ore Classification System</h1>
      </header>

      <main className="app-main">
        <div className="upload-section">
          <UploadImage onUpload={handleUpload} />
        </div>

        <div className="result-section">
          <ClassificationResult result={result} />
        </div>
      </main>

     
    </div>
  );
}

export default App;
