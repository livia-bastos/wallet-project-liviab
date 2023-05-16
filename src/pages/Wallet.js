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

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <table>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </table>
        <button data-testid="delete-btn">Excluir</button>
        <button data-testid="edit-btn">Editar despesa</button>
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
