// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const EXPENSE_SUM = 'EXPENSE_SUM';
export const REMOVE_EXPENSE = 'DELETE_EXPENSE';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: currencies,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const expenseSum = () => ({
  type: EXPENSE_SUM,
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

// thunk creator

function requestFailed(error) {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
}

export function getRates(expense) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        expense.exchangeRates = data;
        dispatch(addExpense(expense));
        dispatch(expenseSum());
      })
      .catch((error) => dispatch(requestFailed(error)));
  };
}
