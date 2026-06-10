from PIL import Image
import numpy as np

def preprocess_image(path_or_file, target_size=(224,224)):
    # path_or_file may be a filepath or a file-like object
    img = Image.open(path_or_file).convert('RGB')
    img = img.resize(target_size)
    arr = np.array(img).astype('float32') / 255.0
    # add batch dimension
    arr = np.expand_dims(arr, 0)
    return arr
