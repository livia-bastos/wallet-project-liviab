import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    console.log(email);
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <h4 data-testid="total-field">{ total.toFixed(2) }</h4>
        <h5 data-testid="header-currency-field">BRL</h5>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.shape({
    toFixed: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
