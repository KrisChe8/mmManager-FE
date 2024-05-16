import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getAllUsersExpenses, getAllUsersIncome } from "../../api";
import "../assets/styles/App.css";
import Header from "./Header";
import Home from "./Home";
import Analysis from "./Analysis";
import Transactions from "./Transactions";
import Budget from "./Budget";
import UserContext from "../context/UserContext";

function AppManager() {
  const [totalExpensesArr, setTotalExpensesArr] = useState([]);
  const [totalIncomeArr, setTotalIncomeArr] = useState([]);
  const [rerenderIncome, setRerenderIncome] = useState("1");

  const location = useLocation();

  let id;
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
    id = loggedInUser.user_id;

    console.log(id);
    console.log(loggedInUser.user_id);
    getAllUsersExpenses(loggedInUser.user_id)
      .then((response) => {
        setTotalExpensesArr(response.totalExpenses);
      })
      .catch((err) => {
        // console.log(err);
      });
    getAllUsersIncome(loggedInUser.user_id)
      .then((response) => {
        setTotalIncomeArr(response.totalIncome);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [rerenderIncome]);

  return (
    <main>
      <Header
        totalExpensesArr={totalExpensesArr}
        totalIncomeArr={totalIncomeArr}
      />
      <Routes>
        <Route
          path="/home/*"
          element={
            <Home
              setRerenderIncome={setRerenderIncome}
              rerenderIncome={rerenderIncome}
            />
          }
        />
        <Route path="/my/analysis/*" element={<Analysis />} />
        <Route path="/my/transactions" element={<Transactions />} />
        <Route
          path="/my/budget"
          element={<Budget idUser={loggedInUser.user_id} />}
        />
      </Routes>
    </main>
  );
}

export default AppManager;
