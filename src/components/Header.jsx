import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

function Header({ totalExpensesArr, totalIncomeArr }) {
  const [activeClass, setActiveClass] = useState(null);
  const [activeDropdownmenu, setActiveDropdownmenu] = useState(null);

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
  }, []);

  //    Calculate total expenses for user
  let myTotalExpenses = 0;
  totalExpensesArr.map((expenses) => {
    myTotalExpenses += Number(expenses.totalforcategory);
  });
  let totalExpensesToDisplay = (myTotalExpenses / 100).toFixed(2);

  // Calculate total income for user
  let myTotalIncome = 0;
  totalIncomeArr.map((income) => {
    myTotalIncome += Number(income.totalforcategory);
  });
  let totalIncomeToDisplay = (myTotalIncome / 100).toFixed(2);

  //    Current Balance
  let currentBalance = ((myTotalIncome - myTotalExpenses) / 100).toFixed(2);

  const handleBurger = (e) => {
    e.preventDefault();
    if (activeClass) {
      setActiveClass(null);
      setActiveDropdownmenu(null);
    } else {
      setActiveClass("menu-btn_active");
      setActiveDropdownmenu("navmenu__list-active");
    }
  };
  const closeDropdown = (e) => {
    e.preventDefault();
    setActiveDropdownmenu(null);
    setActiveClass(null);
  };
  return (
    <>
      <header className="header">
        <div className="navigationBar">
          <div className="left-side">
            <nav className="navmenu">
              <div className="hamburger">
                <div
                  className={`menu-btn ${activeClass}`}
                  onClick={handleBurger}
                >
                  <span className="bar"></span>
                </div>
              </div>
              <div className="mainLogo1">
                <i className="fa-solid fa-money-bill-transfer mainLogo"></i>
                <p className="companyName">My Money Manager</p>
              </div>
              <ul className={`navmenu__list ${activeDropdownmenu}`}>
                <li className="nav-item" onClick={closeDropdown}>
                  <Link className="nav-link" to="/app/home">
                    Home
                  </Link>
                </li>

                <li className="nav-item" onClick={closeDropdown}>
                  <Link className="nav-link" to="/app/my/analysis">
                    Analysis
                  </Link>
                </li>
                <li className="nav-item" onClick={closeDropdown}>
                  <Link className="nav-link" to="/app/my/budget">
                    Budgets
                  </Link>
                </li>
                <li className="nav-item" onClick={closeDropdown}>
                  <Link className="nav-link" to="/app/my/transactions">
                    Transactions
                  </Link>
                </li>

                <li className="nav-item" onClick={closeDropdown}>
                  <Link className="nav-link sign-out" to="/">
                    Sign out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="right-side">
            <p className="activeUser">{loggedInUser.first_name}</p>
          </div>
        </div>
        <div className="headerContent">
          <div className="expensesMain item-headerContent">
            <p className="title-headerContent">Expenses</p>
            <span className="value-headerContent">
              £{totalExpensesToDisplay}
            </span>
          </div>
          <div className="incomeMain item-headerContent">
            <p className="title-headerContent">Income</p>
            <span className="value-headerContent">£{totalIncomeToDisplay}</span>
          </div>
          <div className="balanceMain item-headerContent">
            <p className="title-headerContent">Balance</p>
            <span className="value-headerContent">£{currentBalance}</span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
