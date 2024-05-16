import { useState, useEffect, useContext } from "react";
import { getTotalIncomeByTime, getTotalExpensesByTime } from "../../api";
import { ResponsivePie } from "@nivo/pie";
import UserContext from "../context/UserContext";

function Budget({ idUser }) {
  const [chosenTime, setchosenTime] = useState("month");

  const [allIncome, setAllIncome] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const id = idUser;
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   setLoggedInUser(JSON.parse(storedUser));
  //   id = loggedInUser.user_id;
  // }, []);
  let totalIncomeByChosenTime = 0;
  let cardIncome = 0;
  let cashIncome = 0;
  let investmentIncome = 0;
  let savingsIncome = 0;

  let totalExpensesByChosenTime = 0;
  let cardExpenses = 0;
  let cashExpenses = 0;
  let investmentExpenses = 0;
  let savingsExpenses = 0;

  useEffect(() => {
    getTotalIncomeByTime(chosenTime, id).then((response) => {
      if (!response.status) {
        totalIncomeByChosenTime = 0;
        cardIncome = 0;
        cashIncome = 0;
        investmentIncome = 0;
        savingsIncome = 0;
        setAllIncome([]);
        setAllExpenses([]);
      } else if (response.status == 404) {
        totalIncomeByChosenTime = 0;
        cardIncome = 0;
        cashIncome = 0;
        investmentIncome = 0;
        savingsIncome = 0;
        console.log("404");
      } else if (response.status === 200) {
        setAllIncome(response.data.totalIncome);
      }
    });
    getTotalExpensesByTime(chosenTime, id).then((response) => {
      if (!response.status) {
        totalExpensesByChosenTime = 0;
        cardExpenses = 0;
        cashExpenses = 0;
        investmentExpenses = 0;
        savingsExpenses = 0;
        setAllIncome([]);
        setAllExpenses([]);
      } else if (response.status === 404) {
        totalExpensesByChosenTime = 0;
        cardExpenses = 0;
        cashExpenses = 0;
        investmentExpenses = 0;
        savingsExpenses = 0;
      } else if (response.status === 200) {
        setAllExpenses(response.data.totalExpenses);
      }
    });
  }, [chosenTime]);

  const newTimeVal = (e) => {
    setchosenTime(e.target.value);
  };

  if (allIncome.length > 0) {
    allIncome.map((income) => {
      totalIncomeByChosenTime += Number(income.totalforcategory);
      cardIncome += Number(income.total_card);
      cashIncome += Number(income.total_cash);
      investmentIncome += Number(income.total_investment);
      savingsIncome += Number(income.total_savings);
    });
  }

  if (allExpenses.length > 0) {
    allExpenses.map((expenses) => {
      totalExpensesByChosenTime += Number(expenses.totalforcategory);
      cardExpenses += Number(expenses.total_card);
      cashExpenses += Number(expenses.total_cash);
      investmentExpenses += Number(expenses.total_investment);
      savingsExpenses += Number(expenses.total_savings);
    });
  }

  const data1 = [
    {
      id: "income",
      label: "Income",
      value: totalIncomeByChosenTime,
      color: "hsl(105, 73%, 40%)",
    },
    {
      id: "expenses",
      label: "Expenses",
      value: totalExpensesByChosenTime,
      color: "hsl(0, 73%, 50%)",
    },
  ];

  return (
    <section>
      <h1 className="section-title">My Budget:</h1>

      <ul className="timeBlock">
        <li>
          <input
            className="radiobtnBudget"
            type="radio"
            name="timeV"
            value="today"
            id="today"
            checked={chosenTime === "today"}
            onChange={(e) => newTimeVal(e)}
          />{" "}
          <label htmlFor="today">Today</label>
        </li>
        <li>
          <input
            className="radiobtnBudget"
            type="radio"
            name="timeV"
            value="week"
            id="week"
            checked={chosenTime === "week"}
            onChange={(e) => newTimeVal(e)}
          />{" "}
          <label htmlFor="week">Week</label>
        </li>
        <li>
          <input
            className="radiobtnBudget"
            type="radio"
            name="timeV"
            value="month"
            id="month"
            checked={chosenTime === "month"}
            onChange={(e) => newTimeVal(e)}
          />{" "}
          <label htmlFor="month">Month</label>
        </li>
        <li>
          <input
            className="radiobtnBudget"
            type="radio"
            name="timeV"
            value="year"
            id="year"
            checked={chosenTime === "year"}
            onChange={(e) => newTimeVal(e)}
          />{" "}
          <label htmlFor="year">Year</label>
        </li>
      </ul>

      <div className="showMoney-wrapper">
        <div className="income-wrapper">
          <p className="showMoney-title">
            Income so far: £{(totalIncomeByChosenTime / 100).toFixed(2)}
          </p>
          <ul>
            <li>
              <i className="fa-solid fa-arrow-up symbol"></i>
              Card: £{(cardIncome / 100).toFixed(2)}
            </li>
            <li>
              {" "}
              <i className="fa-solid fa-arrow-up symbol"></i>Cash: £
              {(cashIncome / 100).toFixed(2)}
            </li>
            <li>
              {" "}
              <i className="fa-solid fa-arrow-up symbol"></i>Savings: £
              {(savingsIncome / 100).toFixed(2)}
            </li>
            <li>
              {" "}
              <i className="fa-solid fa-arrow-up symbol"></i>Investment: £
              {(investmentIncome / 100).toFixed(2)}
            </li>
          </ul>
        </div>
        <div className="expenses-wrapper">
          <p className="showMoney-title">
            Expenses so far: £{(totalExpensesByChosenTime / 100).toFixed(2)}
          </p>
          <ul>
            <li>
              <i className="fa-solid fa-arrow-down symbol-red"></i>Card: £
              {(cardExpenses / 100).toFixed(2)}
            </li>
            <li>
              <i className="fa-solid fa-arrow-down symbol-red"></i>Cash: £
              {(cashExpenses / 100).toFixed(2)}
            </li>
            <li>
              <i className="fa-solid fa-arrow-down symbol-red"></i>Savings: £
              {(savingsExpenses / 100).toFixed(2)}
            </li>
            <li>
              <i className="fa-solid fa-arrow-down symbol-red"></i>Investment: £
              {(investmentExpenses / 100).toFixed(2)}
            </li>
          </ul>
        </div>
      </div>
      {totalExpensesByChosenTime !== 0 || totalIncomeByChosenTime !== 0 ? (
        <section className="pie">
          <ResponsivePie
            data={data1}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            tooltip={(point) => {
              return (
                <div
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {point.value}
                </div>
              );
            }}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "dark2" }}
            borderWidth={1}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLabel={(item) => `£ ${(item.value / 100).toFixed(2)} `}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 76,
                itemsSpacing: 40,
                itemWidth: 50,
                itemHeight: 50,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 15,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </section>
      ) : null}
    </section>
  );
}

export default Budget;
