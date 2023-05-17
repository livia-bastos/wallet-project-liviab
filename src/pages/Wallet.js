import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { addCurrencies, expenseSum, removeExpense } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json()).then((result) => {
        const currencies = Object.keys(result)
          .filter((curr) => curr !== 'USDT');
        dispatch(addCurrencies(currencies));
      })
      .catch(() => {});
  }

  deleteExpense = (event) => {
    const { dispatch } = this.props;
    const id = Number(event.target.name);
    event.preventDefault();
    dispatch(removeExpense(id));
    dispatch(expenseSum());
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <Header />
        <WalletForm />
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ parseFloat(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>{ expense.currency }</td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  {(parseFloat(expense.value)
                * parseFloat(expense.exchangeRates[expense.currency].ask)).toFixed(2)}

                </td>
                <td>
                  <button
                    name={ expense.id }
                    onClick={ this.deleteExpense }
                    data-testid="delete-btn"
                  >
                    Excluir

                  </button>
                  <button data-testid="edit-btn">Editar despesa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    description: PropTypes.number.isRequired,
    method: PropTypes.number.isRequired,
    tag: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    currency: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Wallet);
