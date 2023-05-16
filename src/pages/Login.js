import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      emailValid: false,
      passwordValid: false,
    };
  }

  handleChangePassword = (event) => {
    const minPasswordLenght = 6;
    if (event.target.value.length >= minPasswordLenght) {
      this.setState({ senha: event.target.value, passwordValid: true });
      return;
    }
    this.setState({ senha: event.target.value, passwordValid: false });
  };

  handleChangeEmail = (event) => {
    const email = event.target.value;
    const emailValid = /.*@.*.com/.test(email);
    this.setState({ email, emailValid });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, senha, emailValid, passwordValid } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form>
          <label>
            Email
            <input
              type="email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChangeEmail }
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              data-testid="password-input"
              value={ senha }
              onChange={ this.handleChangePassword }
            />
          </label>
          <button
            disabled={ !emailValid || !passwordValid }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
