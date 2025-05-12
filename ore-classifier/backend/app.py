from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import os
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Enable logging
logging.basicConfig(level=logging.INFO)

# Class labels
CLASS_NAMES = ['Biotite', 'Bornite', 'Chrysocolla', 'Malachite', 'Muscovite', 'Pyrite', 'Quartz']

# Paths to your models
MODEL_PATHS = {
    "AlexNet": "models/alexnet_model.h5",
    "VGG16": "models/vgg16_model.h5",
    "Xception": "models/xception_model.h5"
}

# Ensemble weights (from your paper)
MODEL_WEIGHTS = {
    "AlexNet": 0.5,
    "VGG16": 0.1,
    "Xception": 0.4
}

# Load models safely with checks
models = {}
for model_name, model_path in MODEL_PATHS.items():
    if os.path.exists(model_path):
        try:
            models[model_name] = load_model(model_path)
            logging.info(f"{model_name} loaded successfully from {model_path}")
        except Exception as e:
            logging.error(f"Failed to load {model_name}: {e}")
            raise
    else:
        logging.error(f"Model file not found: {model_path}")
        raise FileNotFoundError(f"Missing model file: {model_path}")

# Image preprocessing
def preprocess_image(image_path):
    try:
        img = Image.open(image_path).convert('RGB')
        img = img.resize((224, 224))
        img_array = np.array(img) / 255.0
        return np.expand_dims(img_array, axis=0)
    except Exception as e:
        raise ValueError(f"Image preprocessing failed: {e}")

# Prediction logic using ensemble method
def ensemble_predict(img_array):
    weighted_predictions = np.zeros(len(CLASS_NAMES))
    for name, model in models.items():
        pred = model.predict(img_array)[0]
        weighted_predictions += MODEL_WEIGHTS[name] * pred
    index = np.argmax(weighted_predictions)
    return {
        "class": CLASS_NAMES[index],
        "confidence": round(float(weighted_predictions[index]), 4)
    }

# API endpoint
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    temp_path = "temp_image.jpg"
    file.save(temp_path)

    try:
        img_array = preprocess_image(temp_path)
        result = ensemble_predict(img_array)
        logging.info(f"Prediction: {result}")
        return jsonify(result), 200
    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

# Run server
if __name__ == '__main__':
    app.run(debug=True)
