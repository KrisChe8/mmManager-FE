import { useState, useEffect, useContext } from "react";
import CurrencyInput from "react-currency-input-field";
import {
  getAccountsType,
  getExpensesCategory,
  addCardTransaction,
  addCashTransaction,
  addSavingsTransaction,
  addInvestmentTransaction,
} from "../../api";
import UserContext from "../context/UserContext";

function AddExpenses({ setRerenderIncome, rerenderIncome }) {
  const [expensesCategory, setExpensesCategory] = useState([]);
  const [accountTypeExpenses, setAccountTypeExpenses] = useState([]);

  const [amountExpense, setAmountExpense] = useState(0);
  const [chosenExpCategory, setChosenExpCategory] = useState("");
  const [chosenAccType, setChosenAccType] = useState("");

  const [isListed, setIsListed] = useState(false);
  const [errorPost, setErrorPost] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  let id;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));

    getExpensesCategory().then((response) => {
      setExpensesCategory(response.categories);
    });
    getAccountsType().then((response) => {
      setAccountTypeExpenses(response.accounts);
    });
  }, []);

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setChosenExpCategory(e.target.value);
  };
  const handleAccountChange = (e) => {
    e.preventDefault();
    setChosenAccType(e.target.value);
  };
  id = loggedInUser.user_id;
  const handleExpFormSubmit = (e) => {
    e.preventDefault();
    let amountInPence = Number(amountExpense) * 100;
    const details = {
      transaction_type: "expenses",
      amountPence: amountInPence,
      category: chosenExpCategory,
      user_id: id,
    };
    let step = Number(rerenderIncome);

    if (chosenAccType === "Card") {
      addCardTransaction(details)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            setChosenAccType("");
            setChosenExpCategory("");
            setAmountExpense(null);
            setIsListed(true);
            alert("Expenses added successfully");
            step++;

            setRerenderIncome(step);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorPost(err);
        });
    } else if (chosenAccType === "Cash") {
      addCashTransaction(details)
        .then((response) => {
          if (response.status === 201) {
            setChosenAccType("");
            setChosenExpCategory("");
            setAmountExpense(null);
            setIsListed(true);
            alert("Expenses added successfully");
            step++;

            setRerenderIncome(step);
          }
        })
        .catch((err) => {
          setErrorPost(err);
        });
    } else if (chosenAccType === "Savings") {
      addSavingsTransaction(details)
        .then((response) => {
          if (response.status === 201) {
            setChosenAccType("");
            setChosenExpCategory("");
            setAmountExpense(null);
            setIsListed(true);
            alert("Expenses added successfully");
            step++;

            setRerenderIncome(step);
          }
        })
        .catch((err) => {
          setErrorPost(err);
        });
    } else if (chosenAccType === "Investment") {
      addInvestmentTransaction(details)
        .then((response) => {
          if (response.status === 201) {
            setChosenAccType("");
            setChosenExpCategory("");
            setAmountExpense(null);
            setIsListed(true);
            alert("Expenses added successfully");
            step++;

            setRerenderIncome(step);
          }
        })
        .catch((err) => {
          setErrorPost(err);
        });
    }
  };

  return (
    <section className="home-section">
      <div className="form-wrapper">
        {/* {errorPost ? <h3 className="errorDisplay">{errorPost}</h3> : null} */}
        <form
          className="addExpensesForm addForm"
          onSubmit={handleExpFormSubmit}
        >
          <h1>Add Your Expenses:</h1>
          <div className="select-wrapper">
            <div className="positionWrapper">
              <label htmlFor="accountTypeExp">Your Account Type:</label>
              <select
                name=""
                id="accountTypeExp"
                value={chosenAccType}
                onChange={handleAccountChange}
                required
              >
                <option value="">Choose Account Type</option>
                {accountTypeExpenses.map((account) => {
                  return (
                    <option
                      key={account.accounttype_id}
                      value={account.accounttype_name}
                    >
                      {account.accounttype_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="positionWrapper">
              <label htmlFor="expensesCategory">Your Expenses Category:</label>
              <select
                name=""
                id="expensesCategory"
                value={chosenExpCategory}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Choose Income Category</option>
                {expensesCategory.map((category) => {
                  return (
                    <option
                      key={category.expensescategory_id}
                      value={category.expensescategory_name}
                    >
                      {category.expensescategory_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="amountInput-wrapper">
            <label htmlFor="amountInc">Enter Amount in £:</label>

            <CurrencyInput
              id="amountInc"
              className="amount"
              prefix="£"
              decimalsLimit={2}
              decimalSeparator="."
              placeholder="100.50"
              allowNegativeValue={false}
              value={amountExpense}
              onValueChange={(value) => setAmountExpense(value)}
            />
          </div>

          <button className="saveBtn saveBtnExpenses">Save</button>
        </form>
      </div>
    </section>
  );
}

export default AddExpenses;
