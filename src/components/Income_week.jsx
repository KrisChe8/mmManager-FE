import { ResponsivePie } from "@nivo/pie";
import { useState, useEffect, useContext } from "react";
import { getTotalIncomeByTime } from "../../api";
import UserContext from "../context/UserContext";

function IncomeAnalysis_week() {
  const [msgIncome, setMsgIncome] = useState(null);
  const [incomeDataArr, setIncomeDataArr] = useState([]);
  const [data, setData] = useState([]);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const time = "week";
  // const id = 1;
  const formatedData = [];
  let result = [];
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
    let id = loggedInUser.user_id;
    getTotalIncomeByTime(time, id).then((response) => {
      if (!response.status) {
        setMsgIncome("There is no income yet");
      }
      if (response.status === 200) {
        setIncomeDataArr(response.data.totalIncome);
        result = response.data.totalIncome;
        result.map((item) => {
          let obj = {};
          obj.id = item.category;
          obj.label = item.category;
          let pounds = (item.totalforcategory / 100).toFixed(2);
          obj.value = pounds;
          formatedData.push(obj);
        });
        setData(formatedData);
      }
    });
  }, []);

  return (
    <section className="diagramWrapper">
      <h1 className="diagramTitle">Track Your Income:</h1>
      {msgIncome ? <h2 className="infoMsg"> {msgIncome}</h2> : null}
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "dark2" }}
        borderWidth={1}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLabel={(item) => `£ ${item.value} `}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 86,
            itemsSpacing: 0,
            itemWidth: 107,
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

      <div className="show-wrapper">
        <h2>You have earned so far:</h2>
        <ul className="listOfExpenses">
          {data.map((item) => {
            return (
              <li id={item.label} className="expensesItem">
                {item.label} -{" "}
                <span className="inpoundsIncome"> £{item.value} </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default IncomeAnalysis_week;
