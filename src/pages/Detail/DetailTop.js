import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AmountOption from './AmountOption';

export class DetailTop extends Component {
  //state초기화
  constructor(props) {
    super(props);
    this.state = {
      itemCountNumValue: 1,
      isLoginModalOn: false,
      isModalOn: false,
      amountOption: [],
      selectedOption: this.props.productOption[0].name,
      selectedOptionId: this.props.productOption[0].id,
      productOption: '',
      options: '',
      productId: this.props.productId,
    };
  }
  //수량 증가 감소
  increaseCount = () => {
    this.setState({ itemCountNumValue: this.state.itemCountNumValue + 1 });
  };
  increaseCountRemove = () => {
    if (this.state.itemCountNumValue > 1) {
      this.setState({ itemCountNumValue: this.state.itemCountNumValue - 1 });
    }
  };
  //종류 추가
  onClickToggleHandler = () => {
    this.setState({
      isLoginModalOn: !this.state.isLoginModalOn,
    });
  };
  //modal on handler
  onModal = () => {
    this.setState({
      isModalOn: !this.state.isModalOn,
    });
  };

  selectOption = (options, optionId) => {
    this.setState({
      selectedOption: options,
      selectedOptionId: optionId,
    });
    this.onClickToggleHandler();
  };

  addCart = () => {
    const authToken = localStorage.getItem('token');
    fetch('http://ambitiouskyle.iptime.org:6389/orders/cart', {
      method: 'POST',
      headers: {
        authorization: authToken,
      },
      body: JSON.stringify({
        productId: this.state.productId,
        optionId: this.state.selectedOptionId,
        quantity: this.state.itemCountNumValue,
        // selectedOptionId: this.state.selectedOptionId,
      }),
    })
      .then(response => {
        response.json();
        console.log(response.status);
      })
      .then(response => {
        this.onModal();
        setTimeout(() => {
          this.setState({ isModalOn: false });
        }, 1500);
      });
  };
  //
  goToCart = () => {
    this.addCart();
    setTimeout(() => {
      this.props.history.push('/cart');
    }, 1000);
  };

  render() {
    console.log(this.props.productStandard, '가격이상함');
    const { selectedOption } = this.state;
    return (
      <section className="detail-top-wrap">
        <div className="detail-top-container">
          <div className="detail-top-data">
            <picture>
              <img src={this.props.productImg} alt="제품 이미지" />
            </picture>
            <article className="detail-top-info-wrap">
              <h2>{this.props.productName}</h2>
              <p className="product-standard">
                100g당 {this.props.productStandard}원
              </p>
              <p className="product-price">
                기준가 {this.props.productPrice}원 ({this.props.productGrams}g)
              </p>
              <div className="detail-top-option">
                <p className="detail-top-tit">옵션</p>
                <div className="detail-option-wrap info-box">
                  <button
                    onClick={this.onClickToggleHandler}
                    className={this.state.isLoginModalOn ? 'active' : ''}
                  >
                    {selectedOption && selectedOption}
                    <i className="fas fa-chevron-down drop-down-arrow"></i>
                  </button>
                  <div
                    className={
                      this.state.isLoginModalOn
                        ? 'option-wrap'
                        : 'option-wrap disable'
                    }
                  >
                    <ul>
                      {this.props.productOption &&
                        this.props.productOption.map(el => {
                          console.log(this.props.productOption);
                          return (
                            <AmountOption
                              key={el.id}
                              optionId={el.id}
                              productOption={el.name}
                              selectOption={this.selectOption}
                            />
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="count-wrap">
                <p className="detail-top-tit">수량</p>
                <div className="count-container info-box">
                  <button
                    className="minus-button button-wrap"
                    name="dec"
                    onClick={this.increaseCountRemove}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <div className="count-counter">
                    <span>{this.state.itemCountNumValue}</span>
                  </div>
                  <button
                    className="plus-button button-wrap"
                    name="inc"
                    onClick={this.increaseCount}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="buy-wrap">
                <ul>
                  <li>
                    <button className="btn btn-buy" onClick={this.goToCart}>
                      바로구매
                    </button>
                  </li>
                  <li>
                    <button className="btn btn-cart" onClick={this.addCart}>
                      장바구니
                    </button>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
        <div
          className={this.state.isModalOn ? 'modal-buy active' : 'modal-buy'}
        >
          <i className="fas fa-drumstick-bite"></i>
          <span>장바구니에 추가하였습니다.</span>
        </div>
      </section>
    );
  }
}

export default withRouter(DetailTop);
