# Ex06 BMI Calculator

## Date: 29/05/2026

## AIM

To develop a responsive and interactive Body Mass Index (BMI) Calculator using React that allows users to input their height and weight, and calculates their BMI to categorize their health status (e.g., Underweight, Normal, Overweight, Obese).

## DESIGN STEPS

### STEP 1: Initialize React Project

<li>Create a new React app using create-react-app.</li>

<li>Install React Router using:</li>

npm install react-router-dom

### STEP 2: Set Up Routing

Create routing structure with react-router-dom:

<li>Home route (/) – Intro or Navigation</li>

<li>BMI Calculator route (/bmi)</li>

<li>Result route (/result)</li>

### STEP 3: Design the BMI Form Page

<li>Create a form to accept Height (in cm or m) and Weight (in kg).</li>

<li>On form submit, navigate to the result page with entered values via URL query params or context/state.</li>

### STEP 4: Handle Input Validation

<li>Check if height and weight are valid numbers.</li>

<li>Optionally, show error messages for invalid inputs.</li>

### STEP 5: Perform BMI Calculation

<li>In the result component:

<li>Extract height and weight from the route (URL or passed state).</li>

<li>Apply the BMI formula:</li>

![image](https://github.com/user-attachments/assets/ec785506-c96b-489e-8783-fb1a5d36101a)
​
<li>Convert height from cm to m if needed.</li></li>

### STEP 6: Display Result

<li>Show calculated BMI.</li>

<li>Show category based on BMI range:

<li>Underweight, Normal, Overweight, Obese, etc.</li></li>

### STEP 7: Navigation Options

<li>Provide a button to go back to the BMI form to calculate again.</li>

### STEP 8: Enhancements

<li>Add styling using CSS or Tailwind.</li>

## PROGRAM

### App.js

```
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="page">
      <div className="card">
        <div className="icon">⚖️</div>
        <h1>BMI Calculator</h1>
        <p className="subtitle">Check your Body Mass Index easily</p>

        <Link to="/bmi" className="btn">
          Start Calculation
        </Link>

        <p className="author">
          Developed by <b>KEERTHIVASAN S</b>
          <br />
          Reg No: <b>212223220046</b>
        </p>
      </div>
    </div>
  );
}

function BMICalculator() {
  const navigate = useNavigate();
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      setError("Please enter valid height and weight");
      return;
    }

    setError("");
    navigate(`/result?height=${h}&weight=${w}`);
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Enter Your Details</h2>
        <p className="subtitle">Height in cm and weight in kg</p>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn">
            Calculate BMI
          </button>
        </form>

        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>

        <p className="author">
          Developed by <b>KEERTHIVASAN S</b>
          <br />
          Reg No: <b>212223220046</b>
        </p>
      </div>
    </div>
  );
}

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const height = parseFloat(params.get("height"));
  const weight = parseFloat(params.get("weight"));

  const bmi = weight / Math.pow(height / 100, 2);

  let category = "";
  let emoji = "";

  if (bmi < 18.5) {
    category = "Underweight";
    emoji = "🍃";
  } else if (bmi < 24.9) {
    category = "Normal Weight";
    emoji = "✅";
  } else if (bmi < 29.9) {
    category = "Overweight";
    emoji = "⚠️";
  } else {
    category = "Obese";
    emoji = "🚨";
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Your BMI Result</h2>

        <div className="result-box">
          <p className="bmi-value">{bmi.toFixed(2)}</p>
          <p className="status">
            {emoji} {category}
          </p>
        </div>

        <button className="btn" onClick={() => navigate("/bmi")}>
          Calculate Again
        </button>

        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>

        <p className="author">
          Developed by <b>KEERTHIVASAN S</b>
          <br />
          Reg No: <b>212223220046</b>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}
```

### App.css

```
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
  background: linear-gradient(135deg, #0f172a, #2563eb, #14b8a6);
}

.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 430px;
  padding: 35px 30px;
  text-align: center;
  border-radius: 24px;
  background: rgba(15, 23, 42, 0.88);
  color: white;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.icon {
  font-size: 55px;
  margin-bottom: 10px;
}

h1,
h2 {
  margin: 0;
  font-size: 34px;
  color: #ffffff;
}

.subtitle {
  margin: 12px 0 25px;
  color: #cbd5e1;
  font-size: 15px;
}

input {
  width: 100%;
  padding: 14px;
  margin: 10px 0;
  border: none;
  outline: none;
  border-radius: 12px;
  font-size: 16px;
  background: #e0f2fe;
  color: #0f172a;
}

input:focus {
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.6);
}

.btn {
  width: 100%;
  display: inline-block;
  margin-top: 18px;
  padding: 14px 22px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #14b8a6, #22c55e);
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.35);
}

.back-btn {
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  border: none;
  border-radius: 14px;
  background: #334155;
  color: white;
  font-size: 15px;
  cursor: pointer;
}

.back-btn:hover {
  background: #475569;
}

.error {
  color: #fca5a5;
  font-size: 14px;
  margin: 8px 0;
  font-weight: 600;
}

.result-box {
  margin: 25px 0;
  padding: 25px;
  border-radius: 20px;
  background: #020617;
  border: 1px solid rgba(94, 234, 212, 0.3);
}

.bmi-value {
  margin: 0;
  font-size: 52px;
  font-weight: 800;
  color: #5eead4;
}

.status {
  margin: 8px 0 0;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}

.author {
  margin-top: 25px;
  color: #e2e8f0;
  font-size: 13px;
  line-height: 1.6;
}
```

## OUTPUT

### Default Page

<img width="1919" height="1079" alt="ex6op1" src="https://github.com/user-attachments/assets/411f959d-ea87-4f90-bf6c-93eedfbfd647" />

### Height and Weight Page

<img width="1919" height="1079" alt="ex6op2" src="https://github.com/user-attachments/assets/0962940c-ac5b-4b4a-8714-77d843ba4a78" />

### Input Given

<img width="1919" height="1079" alt="ex6op3" src="https://github.com/user-attachments/assets/19cccc2e-dd73-457d-bb4c-1517660ea730" />

### BMI Value (after Calculation)

<img width="1919" height="1079" alt="ex6op4" src="https://github.com/user-attachments/assets/8717b252-1a52-43e0-8086-aecd1c2cbfd9" />

## RESULT
The BMI Calculator successfully takes user input for height and weight, performs the BMI calculation in real-time using React state and event handling, and displays the BMI value along with the corresponding health category.
