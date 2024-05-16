import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import ExpensesAnalysis from "./Analysis_expenses";
import IncomeAnalysis from "./Analysis_income";

function Analysis() {
  const [activeClassExpensesA, setActiveClassExpensesA] = useState(
    "homebtn_active"
  );
  const [activeClassIncomeA, setActiveClassIncomeA] = useState(null);

  const changeExpensesClass = () => {
    setActiveClassExpensesA("homebtn_active");
    setActiveClassIncomeA(null);
  };
  const changeIncomeClass = () => {
    setActiveClassExpensesA(null);
    setActiveClassIncomeA("homebtn_active");
  };

  return (
    <section>
      <div className="add-home-btn btn-analysis">
        <Link className="switcherLink" to="/app/my/analysis">
          <div
            className={`addExpenses homebtn ${activeClassExpensesA}`}
            onClick={changeExpensesClass}
          >
            <p className="btn-name"> Expenses</p>
          </div>
        </Link>
        <Link className="switcherLink" to="/app/my/analysis/income-analysis">
          <div
            className={`addIncome homebtn ${activeClassIncomeA}`}
            onClick={changeIncomeClass}
          >
            <p className="btn-name"> Income</p>
          </div>
        </Link>
      </div>

      <Routes>
        <Route path="/*" element={<ExpensesAnalysis />} />
        <Route path="/income-analysis/*" element={<IncomeAnalysis />} />
      </Routes>
    </section>
  );
}

export default Analysis;
