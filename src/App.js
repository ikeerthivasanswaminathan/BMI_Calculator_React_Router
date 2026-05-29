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