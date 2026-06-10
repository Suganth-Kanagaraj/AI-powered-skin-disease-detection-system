import os
import numpy as np
from typing import Dict

# Try to lazily load a TensorFlow model if present
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'skin_model.h5')
_model = None

def load_model():
    global _model
    if _model is None:
        try:
            import tensorflow as tf
            _model = tf.keras.models.load_model(MODEL_PATH)
        except Exception:
            _model = None
    return _model

def predict(image_array) -> Dict:
    model = load_model()
    if model is None:
        # placeholder deterministic stub
        return {
            'disease': 'Unknown',
            'confidence': 50.0,
            'severity': 'Unknown',
            'symptoms': [],
            'recommendations': []
        }

    preds = model.predict(image_array)
    # Application should map preds to labels - placeholder below
    conf = float(np.max(preds) * 100.0)
    idx = int(np.argmax(preds))
    # load labels if exists
    labels_path = os.path.join(os.path.dirname(__file__), 'models', 'disease_labels.json')
    labels = None
    try:
        import json
        with open(labels_path, 'r') as f:
            labels = json.load(f)
    except Exception:
        labels = None

    disease = labels[idx] if labels and idx < len(labels) else f'class_{idx}'

    return {
        'disease': disease,
        'confidence': round(conf, 2),
        'severity': 'Moderate' if conf < 90 else 'Severe',
        'symptoms': [],
        'recommendations': []
    }
