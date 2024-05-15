import { useState, useEffect, useContext } from "react";
import CurrencyInput from "react-currency-input-field";
import {
  getAccountsType,
  getIncomeCategory,
  addCardTransaction,
  addCashTransaction,
  addSavingsTransaction,
  addInvestmentTransaction,
} from "../../api";
import UserContext from "../context/UserContext";

function AddIncome({ setRerenderIncome, rerenderIncome }) {
  const [incomeCategory, setIncomeCategory] = useState([]);
  const [accountType, setAccountType] = useState([]);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  let id;
  const transaction_type = "income";
  const [chosenAccount, setChosenAccount] = useState("");
  const [chosenCategory, setChosenCategoy] = useState("");
  const [givenAmount, setGivenAmount] = useState(0);

  const [isListed, setIsListed] = useState(false);
  const [errorPost, setErrorPost] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));

    getIncomeCategory().then((response) => {
      setIncomeCategory(response.categories);
    });
    getAccountsType().then((response) => {
      setAccountType(response.accounts);
    });
  }, []);

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setChosenCategoy(e.target.value);
  };
  const handleAccountChange = (e) => {
    e.preventDefault();
    setChosenAccount(e.target.value);
  };

  id = loggedInUser.user_id;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let amountInPence = Number(givenAmount) * 100;
    const details = {
      transaction_type: "income",
      amountPence: amountInPence,
      category: chosenCategory,
      user_id: id,
    };
    let step = Number(rerenderIncome);

    if (chosenAccount === "Card") {
      addCardTransaction(details)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            setChosenAccount("");
            setChosenCategoy("");
            setGivenAmount(null);
            setIsListed(true);
            alert("Income added successfully");
            step++;

            setRerenderIncome(step);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorPost(err);
        });
    } else if (chosenAccount === "Cash") {
      addCashTransaction(details)
        .then((response) => {
          if (response.status === 201) {
            setChosenAccount("");
            setChosenCategoy("");
            setGivenAmount(null);
            setIsListed(true);
            alert("Income added successfully");
            step++;

            setRerenderIncome(step);
          }
        })
        .catch((err) => {
          setErrorPost(err);
        });
    } else if (chosenAccount === "Savings") {
      addSavingsTransaction(details)
        .then((response) => {
          if (response.status === 201) {
            setChosenAccount("");
            setChosenCategoy("");
            setGivenAmount(null);
            setIsListed(true);
            alert("Income added successfully");
            step++;

            setRerenderIncome(step);
          }
        })
        .catch((err) => {
          setErrorPost(err);
        });
    } else if (chosenAccount === "Investment") {
      addInvestmentTransaction(details)
        .then((response) => {
          if (response.status === 201) {
            setChosenAccount("");
            setChosenCategoy("");
            setGivenAmount(null);
            setIsListed(true);
            alert("Income added successfully");
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
        <form className="addIncomeForm addForm" onSubmit={handleFormSubmit}>
          <h1>Add Your Income:</h1>
          <div className="select-wrapper">
            <div className="positionWrapper">
              <label htmlFor="accountType">Your Account Type:</label>
              <select
                name=""
                id="accountType"
                value={chosenAccount}
                onChange={handleAccountChange}
                required
              >
                <option value="">Choose Account Type</option>
                {accountType.map((account) => {
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
              <label htmlFor="incomeCategory">Your Income Category:</label>
              <select
                name=""
                id="incomeCategory"
                value={chosenCategory}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Choose Income Category</option>
                {incomeCategory.map((category) => {
                  return (
                    <option
                      key={category.incomecategory_id}
                      value={category.incomecategory_name}
                    >
                      {category.incomecategory_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="amountInput-wrapper">
            <label htmlFor="amountInc">Enter Amount in £:</label>
            {/* <input type="text" id="amountInc" className="amount" placeholder="100.50"/> */}
            <CurrencyInput
              id="amountInc"
              className="amount"
              prefix="£"
              decimalsLimit={2}
              decimalSeparator="."
              placeholder="100.50"
              allowNegativeValue={false}
              value={givenAmount}
              onValueChange={(value) => setGivenAmount(value)}
            />
          </div>

          <button className="saveBtn saveBtnIncome">Save</button>
        </form>
      </div>
    </section>
  );
}

export default AddIncome;
