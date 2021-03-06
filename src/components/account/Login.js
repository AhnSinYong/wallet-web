import React, {Component} from 'react';

import TronLogo from "../../images/trans_tron_logo.png";
import {genPriKey, getAddressFromPriKey} from "../../lib/crypto/crypto";
import {base64EncodeToString, byteArray2hexStr} from "../../lib/crypto/code";
import {loginWithPassword} from "../../actions/app";
import {connect} from "react-redux";
import {tu} from "../../utils/i18n";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {withRouter} from "react-router-dom";

class Login extends Component {

  constructor() {
    super();

    this.state = {
      activeTab: 'login',
      address: "",
      password: "",
      privateKey: "",
      loginPassword: "",

      registerCheck1: false,
      registerCheck2: false,
      registerCheck3: false,
    };
  }

  componentDidMount() {
    this.generateAccount();
  }

  generateAccount = () => {
    let priKeyBytes = genPriKey();
    let addressBytes = getAddressFromPriKey(priKeyBytes);
    let address = byteArray2hexStr(addressBytes);
    let pk = base64EncodeToString(priKeyBytes);
    let prikey_pwd = byteArray2hexStr(priKeyBytes);

    this.setState({
      address,
      password: pk,
      privateKey: prikey_pwd,
    })
  };

  // component

  doLogin = () => {
    let {loginPassword} = this.state;
    this.props.loginWithPassword(loginPassword);
    this.props.history.push("/account");
  };

  isRegisterFormValid = () => {
    let {registerCheck1, registerCheck2, registerCheck3} = this.state;

    return registerCheck1 && registerCheck2 && registerCheck3;
  };

  createAccount = () => {
    let {password} = this.state;
    this.props.loginWithPassword(password);
    this.props.history.push("/account");
  };

  renderLogin() {

    let {loginPassword} = this.state;

    return (
      <div className="card-text text-center">
        <p className="text-center">
          <img src={TronLogo}/><br/>
        </p>
        <h5>{tu("Welcome to TRON")}</h5>
        <p className="mt-5">
          <label>{tu("password")}</label>
          <input className="form-control" type="password" onChange={(ev) => this.setState({ loginPassword: ev.target.value })}/>
        </p>
        <p>
          <button
            disabled={loginPassword.length === 0}
            className="btn btn-outline-danger"
            onClick={this.doLogin}>{tu("login")}</button>
        </p>
        <p>
          <a href="javascript:;"
             onClick={() => this.setState({ activeTab: 'register' })}
             className="card-link">{tu("or register a new account")}</a>
        </p>
      </div>
    )
  }

  renderRegister() {

    let {address, password, privateKey} = this.state;

    return (
      <div className="card-text">
        <p className="text-center">
          <img src={TronLogo}/><br/>
        </p>
        <h5 className="text-center">{tu("register")}</h5>
        <div className="mt-5">
          <p>
            <button className="btn btn-primary col-sm" onClick={this.generateAccount}>
              {tu("generate_account")}
            </button>
          </p>
          <form>
            <div className="form-group">
              <label>{tu("Account Address")}</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  readOnly={true}
                  className="form-control"
                  onChange={(ev) => this.setState({ address: ev.target.value })}
                  value={address} />
                <div className="input-group-append">
                  <CopyToClipboard text={address}>
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="fa fa-paste"/>
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>{tu("password")}</label>
              <div className="input-group mb-3">
                <input type="text"
                       readOnly={true}
                       className="form-control"
                       value={password}
                       onChange={(ev) => this.setState({ password: ev.target.value })} />
                <div className="input-group-append">
                  <CopyToClipboard text={password}>
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="fa fa-paste"/>
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>{tu("Private Key")}</label>
              <div className="input-group mb-3">
                <input type="text"
                       readOnly={true}
                       onChange={(ev) => this.setState({ privateKey: ev.target.value })}
                       className="form-control"
                       value={privateKey} />
                <div className="input-group-append">
                  <CopyToClipboard text={privateKey}>
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="fa fa-paste"/>
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div className="form-check">
              <input type="checkbox"
                     className="form-check-input" onChange={(ev) => this.setState({ registerCheck1: ev.target.checked })} />
              <label className="form-check-label">
                {tu("create_account_confirm_1")}
              </label>
            </div>
            <div className="form-check" onChange={(ev) => this.setState({ registerCheck2: ev.target.checked })}>
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">
                {tu("create_account_confirm_2")}
              </label>
            </div>
            <div className="form-check" onChange={(ev) => this.setState({ registerCheck3: ev.target.checked })}>
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">
                {tu("create_account_confirm_3")}
              </label>
            </div>
          </form>
        </div>
        <p className="mt-3">
          <button className="btn btn-outline-success col-sm"
                  disabled={!this.isRegisterFormValid()}
                  onClick={this.createAccount}>{tu("Create Account")} </button>
        </p>
      </div>
    )
  }

  render() {

    let {activeTab} = this.state;

    let page = this.renderLogin();

    if (activeTab === 'register') {
      page = this.renderRegister();
    }

    return (
      <main className="container-fluid pt-5 pb-5 bg-dark">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-lg-5">
              <div className="card">
                <div className="card-header">
                  <ul className="nav nav-tabs card-header-tabs justify-content-center">
                    <li className="nav-item">
                      <a
                          href="javascript:;"
                         className={(activeTab === 'login' ? "active" : "" ) + " nav-link" }
                         onClick={() => this.setState({ activeTab: 'login' })}>
                        {tu("login")}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="javascript:;"
                          className={(activeTab === 'register' ? "active" : "" ) + " nav-link" }
                         onClick={() => this.setState({ activeTab: 'register' })}>
                        {tu("register")}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body mt-5">
                  {page}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}


function mapStateToProps(state) {
  return {

  };
}

const mapDispatchToProps = {
  loginWithPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))

