import { useState, useEffect, useContext } from "react";
import { getAllTransactions } from "../../api";
import moment from "moment";
import UserContext from "../context/UserContext";

function Transactions() {
  const [allTransaction, setAllTransaction] = useState([]);
  const [timeValue, setTimeValue] = useState("month");
  const [msg, setMsg] = useState();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  //   const id = 1;
  let time = "month";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
    let id = loggedInUser.user_id;
    getAllTransactions(timeValue, id).then((response) => {
      if (!response.status) {
        setMsg("There is no transaction yet");
      }
      if (response.status === 200) {
        setMsg("");
        setAllTransaction(response.data.allTransactions);
      }
    });
  }, [timeValue]);

  const formatDate = (date) => {
    let copyDate = date;
    let formated = moment(copyDate).format("MMMM Do YYYY, h:mm:ss a");
    return formated;
  };

  const formatInPounds = (pence) => {
    let pounds = (pence / 100).toFixed(2);
    return `£${pounds}`;
  };
  const formatTransact = (transac) => {
    let classNew;
    if (transac == "income") {
      classNew = "incomeClassTrans";
    } else {
      classNew = "expensesClassTrans";
    }
    let transacName = transac.toUpperCase();
    return <span className={`${classNew}`}>{transacName}</span>;
  };

  const newTimeVal = (e) => {
    e.preventDefault();
    setTimeValue(e.target.value);
  };

  return (
    <section className="transaction-section">
      <h1 className="transactionTitle">All my Transactions:</h1>

      {/* <form action="">
        <div className="timeValueRadio"> */}
      <ul className="timeBlock">
        <li>
          <input
            className="radiobtn radiobtnBudget"
            type="radio"
            name="time"
            value="today"
            id="today"
            checked={timeValue === "today"}
            onChange={(e) => newTimeVal(e)}
          />{" "}
          <label htmlFor="today">Today</label>
        </li>
        <li>
          <input
            className="radiobtn radiobtnBudget"
            type="radio"
            name="time"
            value="week"
            id="week"
            checked={timeValue === "week"}
            onChange={(e) => newTimeVal(e)}
          />{" "}
          <label htmlFor="week">Week</label>
        </li>
        <li>
          <input
            className="radiobtn radiobtnBudget"
            type="radio"
            name="time"
            value="month"
            id="month"
            checked={timeValue === "month"}
            onChange={(e) => newTimeVal(e)}
          />{" "}
          <label htmlFor="month">Month</label>
        </li>
        <li>
          <input
            className="radiobtn"
            type="radio"
            name="time"
            value="year"
            id="year"
            checked={timeValue === "year"}
            onChange={(e) => newTimeVal(e)}
          />{" "}
          <label htmlFor="year">Year</label>
        </li>
      </ul>
      {/* </div>
      </form> */}
      {msg ? (
        <p className="nothingShowMsg">{msg}</p>
      ) : (
        <div className="transaction-wrapper">
          <ul className="transaction-list">
            {allTransaction.map((item) => {
              return (
                <li id={item.date}>
                  <h3 className="date">{formatDate(item.date)} </h3>
                  {item.card_transaction ? (
                    <div className="details-wrapper">
                      <h5>Card: {formatTransact(item.card_transaction)} </h5>
                      <p>
                        {" "}
                        {item.cardcategory}:{" "}
                        {formatInPounds(item.card_amountpence)}{" "}
                      </p>
                    </div>
                  ) : null}
                  {item.cash_transaction ? (
                    <div>
                      <h5>Cash: {formatTransact(item.cash_transaction)}</h5>{" "}
                      <p>
                        {item.cashcategory}:{" "}
                        {formatInPounds(item.cash_amountpence)}{" "}
                      </p>
                    </div>
                  ) : null}
                  {item.savings_transaction ? (
                    <div>
                      <h5>
                        Savings: {formatTransact(item.savings_transaction)}
                      </h5>{" "}
                      <p>
                        {item.savingscategory}:{" "}
                        {formatInPounds(item.savings_amountpence)}
                      </p>
                    </div>
                  ) : null}
                  {item.investment_transaction ? (
                    <div>
                      <h5>
                        Investment:{" "}
                        {formatTransact(item.investment_transaction)}
                      </h5>{" "}
                      <p>
                        {item.investmentcategory}:{" "}
                        {formatInPounds(item.investment_amountpence)}{" "}
                      </p>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

export default Transactions;
