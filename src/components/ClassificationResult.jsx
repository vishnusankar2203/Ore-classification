import React from 'react';
import './ClassificationResult.css';

const ClassificationResult = ({ result }) => {
    return (
        <div className="result-container">
            <h2>Prediction Result</h2>
            {result ? (
                <div>
                    <p>Class: {result.class}</p>
                    <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
                </div>
            ) : (
                <p>No result available.</p>
            )}
        </div>
    );
};

export default ClassificationResult;
