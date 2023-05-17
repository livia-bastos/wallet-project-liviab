import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { addCurrencies } from '../redux/actions';

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

  // deleteExpense = (event) => {
  //   event.preventDefault();
  //   const updatedList = [...this.state];
  //   this.setState({ tableData: updatedList });
  // };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <Header />
        <WalletForm />
        <table>
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
  expenses: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Wallet);
