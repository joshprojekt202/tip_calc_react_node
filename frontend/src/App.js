import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [billAmount, setBillAmount] = useState('');
  const [serviceQuality, setServiceQuality] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [tipPerPerson, setTipPerPerson] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://3001-joshprojekt-tipcalcreac-tij3ge153i2.ws-us107.gitpod.io/calculate', {
      billAmount: parseFloat(billAmount),
      serviceQuality: parseFloat(serviceQuality),
      numberOfPeople: parseInt(numberOfPeople, 10)
    })
    .then(response => {
      setTipPerPerson(response.data.tipPerPerson);
    })
    .catch(error => {
      console.error('Error:', error);
      setTipPerPerson(null);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tip Calculator</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Bill Amount"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
          />
          <input
            type="number"
            placeholder="Service Quality (%)"
            value={serviceQuality}
            onChange={(e) => setServiceQuality(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of People"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
          />
          <button type="submit">Calculate Tip</button>
        </form>
        {tipPerPerson !== null && (
          <p>Tip Per Person: ${tipPerPerson.toFixed(2)}</p>
        )}
      </header>
    </div>
  );
}

export default App;