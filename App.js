import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputData, setInputData] = useState({
    age: '',
    sex: '',
    cigsPerDay: '',
    totChol: '',
    sysBP: '',
    glucose: ''
  });
  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', inputData); // Specify full URL
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Heart Disease Prediction</h1>
      <form onSubmit={handleSubmit} action="#" method="post"> {/* Set action to "#" and method to "post" */}
        <label>
          Age:
          <input type="text" name="age" value={inputData.age} onChange={handleChange} />
        </label>
        <br />
        <label>
          Sex (Male=1, Female=0):
          <input type="text" name="sex" value={inputData.sex} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cigarettes Per Day:
          <input type="text" name="cigsPerDay" value={inputData.cigsPerDay} onChange={handleChange} />
        </label>
        <br />
        <label>
          Total Cholesterol:
          <input type="text" name="totChol" value={inputData.totChol} onChange={handleChange} />
        </label>
        <br />
        <label>
          Systolic Blood Pressure:
          <input type="text" name="sysBP" value={inputData.sysBP} onChange={handleChange} />
        </label>
        <br />
        <label>
          Glucose:
          <input type="text" name="glucose" value={inputData.glucose} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div>
          <h2>Prediction:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default App;
