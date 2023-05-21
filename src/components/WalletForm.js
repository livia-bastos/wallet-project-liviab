import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { expenseSum, getRates, saveEdited } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveExpense = (event) => {
    event.preventDefault();
    const { id } = this.state;
    const { dispatch } = this.props;
    dispatch(getRates(this.state));
    const newId = id + 1;
    this.setState({
      id: newId,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  editForm = (event) => {
    event.preventDefault();
    const { dispatch, idToEdit } = this.props;
    const editedExpense = this.state;
    editedExpense.id = idToEdit;
    dispatch(saveEdited(editedExpense));
    dispatch(expenseSum());
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, tag, method } = this.state;
    return (
      <div>
        <form>
          <label>
            Despesas
            <input
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Descrição
            <input
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          Moeda
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies.map((curr) => (<option key={ curr }>{ curr }</option>))}
          </select>
          Método de pagamento
          <select
            name="method"
            onChange={ this.handleChange }
            value={ method }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <label>
            Categoria
            <select
              name="tag"
              onChange={ this.handleChange }
              value={ tag }
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          { editor ? (
            <button onClick={ this.editForm }>Editar despesa</button>
          ) : (
            <button
              onClick={ this.saveExpense }
            >
              Adicionar despesa
            </button>
          ) }

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});
export default connect(mapStateToProps)(WalletForm);
