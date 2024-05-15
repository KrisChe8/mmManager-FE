import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://mm-managerbe.onrender.com/api",
});

// TOTAL expenses / income
export const getAllUsersExpenses = (id) => {
  return baseApi.get(`/totalexpenses/${id}`).then((response) => {
    return response.data;
  });
};

export const getAllUsersIncome = (id) => {
  return baseApi.get(`/totalincome/${id}`).then((response) => {
    return response.data;
  });
};

// Get Category
export const getIncomeCategory = () => {
  return baseApi.get(`/incomecat`).then((response) => {
    return response.data;
  });
};
export const getExpensesCategory = () => {
  return baseApi.get(`/expensescat`).then((response) => {
    return response.data;
  });
};
// Get accounts type
export const getAccountsType = () => {
  return baseApi
    .get(`/accounttype`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
//POST transaction
export const addCardTransaction = (details) => {
  return baseApi
    .post("/cardtransaction", details)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const addCashTransaction = (details) => {
  return baseApi
    .post("/cashtransaction", details)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const addSavingsTransaction = (details) => {
  return baseApi
    .post("/savingstransaction", details)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const addInvestmentTransaction = (details) => {
  return baseApi
    .post("/investmenttransaction", details)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

// GET all Expenses
export const getTotalExpensesByTime = (time, id) => {
  return baseApi
    .get(`/totalexpenses/${id}?time=${time}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

//GET all Income
export const getTotalIncomeByTime = (time, id) => {
  return baseApi
    .get(`/totalincome/${id}?time=${time}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

// GET all Transactions
export const getAllTransactions = (time, id) => {
  return baseApi
    .get(`/alltransactions/${id}?time=${time}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

// POST new User
export const postNewUser = (newUser) => {
  return baseApi.post(`/users`, newUser).then((response) => {
    return response.data;
  });
};

//GET user by email
export const getUser = (email) => {
  return baseApi.get(`users?email=${email}`).then((response) => {
    return response.data.users[0];
  });
};
