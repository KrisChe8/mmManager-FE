import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AddExpenses from "./AddExpenses";
import AddIncome from "./AddIncome";
import { Link } from "react-router-dom";
import Signup from "./Signup";

function Home({ setRerenderIncome, rerenderIncome }) {
  const [activeClassExpenses, setActiveClassExpenses] = useState(null);
  const [activeClassIncome, setActiveClassIncome] = useState("homebtn_active");

  const changeaddExpensesClass = () => {
    setActiveClassExpenses("homebtn_active");
    setActiveClassIncome(null);
  };
  const changeaddIncomeClass = () => {
    setActiveClassExpenses(null);
    setActiveClassIncome("homebtn_active");
  };

  return (
    <main className="home-wrapper">
      <div className="add-home-btn">
        <Link className="switcherLink" to="/home/addexpenses">
          <div
            className={`addExpenses homebtn ${activeClassExpenses}`}
            onClick={changeaddExpensesClass}
          >
            <p className="btn-name"> Add Expenses</p>
          </div>
        </Link>
        <Link className="switcherLink" to="/home">
          <div
            className={`addIncome homebtn ${activeClassIncome}`}
            onClick={changeaddIncomeClass}
          >
            <p className="btn-name"> Add Income</p>
          </div>
        </Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <AddIncome
              setRerenderIncome={setRerenderIncome}
              rerenderIncome={rerenderIncome}
            />
          }
        />
        <Route
          path="/addexpenses"
          element={
            <AddExpenses
              setRerenderIncome={setRerenderIncome}
              rerenderIncome={rerenderIncome}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default Home;
