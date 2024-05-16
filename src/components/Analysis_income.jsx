import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import IncomeAnalysis_month from "./Income_month";
import IncomeAnalysis_today from "./Income_today";
import IncomeAnalysis_week from "./Income_week";
import IncomeAnalysis_year from "./Income_year";

function IncomeAnalysis() {
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
    <section className="income-section">
      <div className="analysis-wrapper">
        <div className="switcher-time">
          <div
            className={`switcher-time-item  ${todayClass}`}
            onClick={switchTodayClass}
          >
            <Link
              className="switcher-link "
              to="/app/my/analysis/income-analysis/today"
            >
              {" "}
              Today
            </Link>
          </div>
          <div
            className={`switcher-time-item ${weekClass}`}
            onClick={switchWeekClass}
          >
            <Link
              className="switcher-link"
              to="/app/my/analysis/income-analysis/week"
            >
              {" "}
              Week{" "}
            </Link>
          </div>

          <div
            className={`switcher-time-item ${monthClass}`}
            onClick={switchMonthClass}
          >
            <Link
              className="switcher-link"
              to="/app/my/analysis/income-analysis/month"
            >
              {" "}
              Month
            </Link>
          </div>
          <div
            className={`switcher-time-item ${yearClass}`}
            onClick={switchYearClass}
          >
            <Link
              className="switcher-link"
              to="/app/my/analysis/income-analysis/year"
            >
              {" "}
              Year
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<IncomeAnalysis_today />} />
          <Route path="/today" element={<IncomeAnalysis_today />} />
          <Route path="/week" element={<IncomeAnalysis_week />} />
          <Route path="/month" element={<IncomeAnalysis_month />} />
          <Route path="/year" element={<IncomeAnalysis_year />} />
        </Routes>
      </div>
    </section>
  );
}

export default IncomeAnalysis;
