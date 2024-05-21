from flask import Flask, request, jsonify
import pandas as pd
import joblib
from sklearn import preprocessing
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define a route for printing data in the console
@app.route('/print-data', methods=['POST'])
def print_data():
    try:
        data = request.get_json()  # Get input data from the request
        print("Data received from React:", data)  # Print the data to the console
        return jsonify({'message': 'Data printed successfully'})  # Return success message
    except Exception as e:
        return jsonify({'error': str(e)})  # Return error message if any

# Define a route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()  # Get input data from the request
        # Preprocess the data if necessary
        X = pd.DataFrame(data, index=[0])  # Convert JSON data to DataFrame
        X = X[['age', 'sex', 'cigsPerDay', 'totChol', 'sysBP', 'glucose']]  # Select relevant features
        X = preprocessing.StandardScaler().fit_transform(X)  # Normalize the data
        # Make predictions using the model
        model = joblib.load('new.py')
        prediction = model.predict(X)
        return jsonify({'prediction': prediction.tolist()})  # Return prediction as JSON
    except Exception as e:
        return jsonify({'error': str(e)})  # Return error message if any

if __name__ == '__main__':
    app.run(debug=True)
