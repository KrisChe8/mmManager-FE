import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import ExpensesMonth_analysis from "./Expenses_month";
import ExpensesToday_analysis from "./Expenses_today";
import ExpensesWeek_analysis from "./Expenses_week";
import ExpensesYear_analysis from "./Expenses_year";

function ExpensesAnalysis() {
  const [todayClass, setTodayClass] = useState("switcher-link_active");
  const [weekClass, setWeekClass] = useState(null);
  const [monthClass, setMonthClass] = useState(null);
  const [yearClass, setYearClass] = useState(null);

  const switchTodayClass = () => {
    setTodayClass("switcher-link_active");
    setWeekClass(null);
    setMonthClass(null);
    setYearClass(null);
  };
  const switchWeekClass = () => {
    setTodayClass(null);
    setWeekClass("switcher-link_active");
    setMonthClass(null);
    setYearClass(null);
  };

  const switchMonthClass = () => {
    setTodayClass(null);
    setWeekClass(null);
    setMonthClass("switcher-link_active");
    setYearClass(null);
  };
  const switchYearClass = () => {
    setTodayClass(null);
    setWeekClass(null);
    setMonthClass(null);
    setYearClass("switcher-link_active");
  };

  return (
    <section>
      <div className="analysis-wrapper">
        <div className="switcher-time">
          <div
            className={`switcher-time-item  ${todayClass}`}
            onClick={switchTodayClass}
          >
            <Link className="switcher-link " to="/app/my/analysis/today">
              {" "}
              Today
            </Link>
          </div>
          <div
            className={`switcher-time-item ${weekClass}`}
            onClick={switchWeekClass}
          >
            <Link className="switcher-link" to="/app/my/analysis/week">
              {" "}
              Week{" "}
            </Link>
          </div>

          <div
            className={`switcher-time-item ${monthClass}`}
            onClick={switchMonthClass}
          >
            <Link className="switcher-link" to="/app/my/analysis/month">
              {" "}
              Month
            </Link>
          </div>
          <div
            className={`switcher-time-item ${yearClass}`}
            onClick={switchYearClass}
          >
            <Link className="switcher-link" to="/app/my/analysis/year">
              {" "}
              Year
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<ExpensesToday_analysis />} />
          <Route path="/today" element={<ExpensesToday_analysis />} />
          <Route path="/week" element={<ExpensesWeek_analysis />} />
          <Route path="/month" element={<ExpensesMonth_analysis />} />
          <Route path="/year" element={<ExpensesYear_analysis />} />
        </Routes>
      </div>
    </section>
  );
}

export default ExpensesAnalysis;
