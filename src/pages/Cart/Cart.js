import React, { Component } from 'react';
import { API } from '../../config';
import CartList from './CartList';
import CouponModal from '../../components/Modal/CouponModal';
import { withRouter } from 'react-router-dom';

import './Cart.scss';

export class Cart extends Component {
  state = {
    cartData: '',
    id: '',
    user: '',
    isCoupon: false,
    couponValue: '',
    couponId: '',
    isloaded: '',
  };

  quantityPlus = (cartItemId, cartIndex, stock) => {
    const newCartData = [...this.state.cartData];
    if (newCartData[cartIndex].quantity < stock) {
      newCartData[cartIndex].quantity = newCartData[cartIndex].quantity + 1;
      this.setState({ cartData: newCartData });

      const authToken = localStorage.getItem('token');

      fetch(`${API.CART}/${cartItemId}`, {
        method: 'PATCH',
        headers: {
          authorization: authToken,
        },
        body: JSON.stringify({
          changeQuantity: this.state.cartData[cartIndex].quantity,
        }),
      });
    } else if (newCartData[cartIndex].quantity === stock) {
      alert('구매할 수 있는 최대수량입니다.');
    }

    // if (newCartData[cartIndex].quantity === stock) {
    //   alert('구매할 수 있는 최대수량입니다.');
    // }
  };

  quantityMinus = (cartItemId, cartIndex) => {
    const newCartData = [...this.state.cartData];
    if (newCartData[cartIndex].quantity > 1) {
      newCartData[cartIndex].quantity = newCartData[cartIndex].quantity - 1;
      this.setState({ cartData: newCartData });

      const authToken = localStorage.getItem('token');

      fetch(`${API.CART}/${cartItemId}`, {
        method: 'PATCH',
        headers: {
          authorization: authToken,
        },
        body: JSON.stringify({
          changeQuantity: newCartData[cartIndex].quantity,
        }),
      });
    }
  };

  deleteCartItem = cartItemId => {
    const authToken = localStorage.getItem('token');

    fetch(`${API.CART}/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        authorization: authToken,
      },
      body: cartItemId,
    });

    let newCartData = [...this.state.cartData];

    newCartData = newCartData.filter(
      cartItem => cartItem.cartItemId !== cartItemId
    );
    this.setState({ cartData: newCartData });
  };

  selectCoupon = (value, Id) => {
    this.setState({ couponValue: value });
    this.setState({ couponId: Id });
  };

  componentDidMount() {
    const authToken = localStorage.getItem('token');
    fetch(API.CART, {
      method: 'GET',
      headers: {
        authorization: authToken,
      },
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          cartData: data.cartItems,
          isloaded: true,
        });
      });

    fetch(`${API.USERS_ME}`, {
      method: 'GET',
      headers: {
        authorization: authToken,
      },
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ user: data.result });
      });
  }

  toggleCoupon = () => {
    this.setState({ isCoupon: !this.state.isCoupon });
  };

  doBuy = () => {
    const authToken = localStorage.getItem('token');
    fetch(`${API.PURCHASE}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        couponId: this.state.couponId,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.message === 'SOLD_OUT') {
          alert(`품절된 상품을 제거해주세요 (${data.soldOutProduct})`);
        } else {
          alert('구매가 완료되었습니다.');
          this.props.history.push('/mypage');
        }
      });
  };

  render() {
    const { cartData } = this.state;
    const totalValue =
      cartData &&
      cartData
        .map(cart => cart.price * cart.quantity)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const orderCount = this.state.user.orderCount;
    let shippingFee = 2500;
    shippingFee = totalValue > 50000 || orderCount === 0 ? 0 : 2500;
    console.log(this.state);
    return (
      <div className="cart">
        <p className="cartTitle">장바구니</p>
        <div className="sectionWrap">
          {this.state.cartData && this.state.cartData.length !== 0 && (
            <>
              <section className="cartContainer">
                <div className="listHeader">
                  <div className="header-info">상품정보</div>
                  <div className="header-count">수량</div>
                  <div className="header-price">가격</div>
                </div>
                {this.state.cartData.map((cartData, idx) => (
                  <CartList
                    key={idx}
                    cartIndex={idx}
                    cartItemId={cartData.cartItemId}
                    cartData={cartData.thumbnail}
                    grams={cartData.grams}
                    thumbnail={cartData.thumbnail}
                    name={cartData.name}
                    option={cartData.option}
                    price={cartData.price}
                    quantity={cartData.quantity}
                    quantityPlus={this.quantityPlus}
                    quantityMinus={this.quantityMinus}
                    deleteCartItem={this.deleteCartItem}
                    stock={cartData.stock}
                  />
                ))}
              </section>

              <section className="paymentContainer">
                <div className="paymentBox">
                  <div className="productPrice">
                    <p className="productPrice__text">총 상품 금액</p>
                    <p className="productPrice__price">
                      {totalValue.toLocaleString()}원
                    </p>
                  </div>
                  <div className="shippingPrice">
                    <div className="shippingPrice-total">
                      <p>총 배송비</p>
                      <p>{shippingFee.toLocaleString()}원</p>
                    </div>
                    {totalValue < 50000 && (
                      <div className="shippingPrice-basic">
                        <span className="shippingFeeText">기본 배송비</span>
                        <span className="basic-price">
                          {shippingFee.toLocaleString()}원
                        </span>
                      </div>
                    )}

                    {totalValue && orderCount !== 0 > 50000 && (
                      <div className="shippingPrice-basic">
                        <span className="shippingFeeText">
                          50,000 이상 구매시 배송비 무료
                        </span>
                      </div>
                    )}
                    {orderCount === 0 && (
                      <div className="firstPayment">
                        <span className="firstBuyText">첫구매 무료배송</span>
                        <span>-100%</span>
                      </div>
                    )}
                  </div>
                  {orderCount === 0 && (
                    <div className="paymentMessage">
                      첫구매 무료배송 혜택이 적용되었습니다.
                    </div>
                  )}

                  {this.state.user.isAvailable && (
                    <div className="canFresh">
                      <i className="fas fa-rocket">신선배송이 가능합니다.</i>
                    </div>
                  )}
                  {this.state.couponValue !== '' && (
                    <div className="shippingPrice">
                      <div className="shippingPrice-total">
                        <p>쿠폰 적용금액</p>
                        <p>{this.state.couponValue.toLocaleString()}원</p>
                      </div>
                    </div>
                  )}

                  <div className="useCoupon dropbtn">
                    <div onClick={this.toggleCoupon}>
                      쿠폰 사용하기 <i class="far fa-check-circle"></i>
                    </div>
                  </div>
                  {this.state.isCoupon && (
                    <CouponModal
                      couponData={this.state.user.coupons}
                      couponQuantity={this.state.user.coupon}
                      selectCoupon={this.selectCoupon}
                      toggleCoupon={this.toggleCoupon}
                    />
                  )}
                  <div className="totalPrice">
                    <p className="totalPrice-text">예상 결제 금액</p>
                    <p className="totalPrice-won">
                      {totalValue - this.state.couponValue + shippingFee < 0
                        ? 0
                        : (
                            totalValue -
                            this.state.couponValue +
                            shippingFee
                          ).toLocaleString()}
                      원
                    </p>
                  </div>
                  <button className="paymentBtn" onClick={() => this.doBuy()}>
                    전체상품 주문하기
                  </button>
                  <button
                    className="keepShoppingBtn"
                    onClick={() => {
                      this.props.history.push('/list');
                    }}
                  >
                    쇼핑계속하기
                  </button>
                </div>
              </section>
            </>
          )}

          {this.state.isloaded && this.state.cartData.length === 0 && (
            <section className="cartItemNone">
              <div className="emptyCart">장바구니에 담은 상품이 없습니다.</div>
              <div
                className="continueShopping"
                onClick={() => {
                  this.props.history.push('/list');
                }}
              >
                쇼핑 계속하기
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Cart);
