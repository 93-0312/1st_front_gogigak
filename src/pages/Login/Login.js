import React, { Component } from 'react';
import './Login.scss';
import { API } from '../../config';

export class Login extends Component {
  state = {
    id: '',
    password: '',
  };

  login = e => {
    e.preventDefault();
    fetch(API.SIGN_IN, {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.id,
        password: this.state.password,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'INVALID_USER') {
          alert('INVALID_USER');
        } else {
          localStorage.setItem('token', result.token);
          alert('로그인 성공');
          this.props.history.push('/');
        }
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validateEmail = value => {
    const regExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;

    return regExp.test(value);
  };

  validatePassword = value => {
    const regExp = /^[a-zA-Z0-9]{8,20}$/;
    return regExp.test(value);
  };

  render() {
    return (
      <div className="login">
        <div className="loginTitle">로그인</div>
        <p className="loginSubTitle">이메일 로그인</p>
        <form>
          <section className="LoginSection">
            <input
              className="LoginIdInput"
              name="id"
              placeholder="아이디(이메일 주소)를 입력하세요"
              onChange={this.handleChange}
            />
            <input
              className="LoginIdPw"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={this.handleChange}
            />
          </section>
          <button className="loginButton" onClick={this.login}>
            로그인
          </button>
        </form>

        <article class="findInfo">
          <section className="findMyId">
            <p>아이디 / 비밀번호 찾기</p>
          </section>
        </article>
        <p className="loginSubTitle">SNS 간편 로그인</p>
        <article>
          <div>
            <button className="loginWithKakao">
              <div>
                <i className="fas fa-comment"></i>
                <span>&nbsp; 카카오로 시작하기</span>
              </div>
            </button>
          </div>
        </article>
        <article>
          <div>
            <button className="loginWithNaver">
              <div>
                <i className="fas fa-portrait"></i>
                <span>&nbsp;&nbsp;네이버로 시작하기</span>
              </div>
            </button>
          </div>
        </article>
        <p className="firstRegister">
          정육각이 처음이신가요? &nbsp;
          <span
            className="goTosignUp"
            onClick={() => this.props.history.push('/sign-up')}
          >
            회원가입하기
          </span>
        </p>
      </div>
    );
  }
}

export default Login;
