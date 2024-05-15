import { ResponsivePie } from "@nivo/pie";
import { useState, useEffect, useContext } from "react";
import { getTotalExpensesByTime } from "../../api";
import UserContext from "../context/UserContext";

function ExpensesWeek_analysis() {
  const [dataArr, setDataArr] = useState([]);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState(null);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const time = "week";
  // const id = 1;
  const formData = [];
  let result = [];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
    let id = loggedInUser.user_id;
    getTotalExpensesByTime(time, id).then((response) => {
      if (!response.status) {
        setMsg("There is no expenses yet");
      }
      if (response.status === 200) {
        setDataArr(response.data.totalExpenses);
        result = response.data.totalExpenses;
        result.map((item) => {
          let obj = {};
          obj.id = item.category;
          obj.label = item.category;
          let pounds = (item.totalforcategory / 100).toFixed(2);
          obj.value = pounds;
          formData.push(obj);
        });
        setData(formData);
        console.log(formData);
      }
    });
  }, []);
  return (
    <section className="diagramWrapper">
      <h1 className="diagramTitle">Track Your Expenses:</h1>
      {msg ? <h2 className="infoMsg"> {msg}</h2> : null}
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
            itemWidth: 50,
            itemHeight: 50,
            itemTextColor: "#999",
            itemDirection: "top-to-bottom",
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
        <h2>You have spent so far:</h2>
        <ul className="listOfExpenses">
          {data.map((item) => {
            return (
              <li id={item.label} className="expensesItem">
                {item.label} - <span className="inpounds"> £{item.value} </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ExpensesWeek_analysis;
