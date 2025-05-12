import React, { useState } from 'react';
import axios from 'axios';
import './UploadImage.css';

const UploadImage = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setError('');
        if (selectedFile) {
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                },
            });
            onUpload(response.data);
        } catch (err) {
            setError('Error uploading image. Please try again.');
        }
    };

    return (
        <div className="upload-container">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
                <div className="image-preview">
                    <img src={previewUrl} alt="Preview" />
                </div>
            )}
            <button className="upload-button" onClick={handleUpload}>Upload</button>
            {progress > 0 && <div className="upload-progress">Upload Progress: {progress}%</div>}
            {error && <div className="upload-error">{error}</div>}
        </div>
    );
};

export default UploadImage;
