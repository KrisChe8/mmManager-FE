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
import SignInUpManager from "./SignInUpManager";
import AppManager from "./App_manager";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  // const [totalExpensesArr, setTotalExpensesArr] = useState([]);
  // const [totalIncomeArr, setTotalIncomeArr] = useState([]);
  // const [rerenderIncome, setRerenderIncome] = useState("1");

  // const [loggedInUser, setLoggedInUser] = useState({});
  // const location = useLocation();
  // const { hash, pathname, search } = location;
  // const [showHeader, setShowheader] = useState(false);
  // let id;

  // useEffect(() => {
  //   console.log(pathname);
  //   const storedUser = localStorage.getItem("user");
  //   setLoggedInUser(JSON.parse(storedUser));
  //   id = loggedInUser.user_id;

  //   if (pathname == "/signin" || pathname == "/") {
  //     setShowheader(false);
  //   } else {
  //     setShowheader(true);
  //     console.log("here");
  //   }
  //   console.log(id);
  //   getAllUsersExpenses(loggedInUser.user_id)
  //     .then((response) => {
  //       setTotalExpensesArr(response.totalExpenses);
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //     });
  //   getAllUsersIncome(loggedInUser.user_id)
  //     .then((response) => {
  //       setTotalIncomeArr(response.totalIncome);
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //     });
  // }, [rerenderIncome, pathname]);

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        {/* {showHeader ? (
          <Header
            totalExpensesArr={totalExpensesArr}
            totalIncomeArr={totalIncomeArr}
          />
        ) : null}
        */}
        <Routes>
          <Route path="/*" element={<SignInUpManager />} />

          <Route path="/app/*" element={<AppManager />} />
          {/* <Route path="/analysis/*" element={<Analysis />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route
            path="/budget"
            element={<Budget idUser={loggedInUser.user_id} />}
          /> */}
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
