// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_CURRENCIES, ADD_EXPENSE,
  EXPENSE_SUM, REMOVE_EXPENSE, CHANGE_EXPENSE, SAVE_EDITED } from '../actions';

const INITIAL_STATE = {
  total: 0,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};
const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REMOVE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id) };
  case CHANGE_EXPENSE:
    return { ...state, editor: true, idToEdit: action.id };
  case SAVE_EDITED: {
    const editedIndex = state.expenses
      .findIndex((expense) => expense.id === action.editedExpense.id);
    action.editedExpense.exchangeRates = state.expenses[editedIndex].exchangeRates;
    state.expenses[editedIndex] = action.editedExpense;
    return { ...state, editor: false };
  }
  case EXPENSE_SUM:
    return {
      ...state,
      total: state.expenses
        .reduce((acc, expense) => acc + parseFloat(expense.value)
        * parseFloat(expense.exchangeRates[expense.currency].ask), 0),
    };
  default:
    return state;
  }
};

export default wallet;
