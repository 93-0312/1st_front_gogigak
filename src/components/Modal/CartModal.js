import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Options from './Options';
import { API } from '../../config';

import './CartModal.scss';

export class CartModal extends React.Component {
  state = {
    isMenu: false,
    itemCount: 1,
    optionId: '',
    optionName: '',
  };

  handleMenuClick = () => {
    this.setState({ isMenu: !this.state.isMenu });
  };

  handleMinusOption = () => {
    if (this.state.itemCount !== 0) {
      this.setState({ itemCount: this.state.itemCount - 1 });
    }
  };

  handlePlusOption = () => {
    if (this.state.itemCount < this.props.stock) {
      this.setState({ itemCount: this.state.itemCount + 1 });
    } else if (this.state.itemCount === this.props.stock) {
      alert('재고가 부족합니다.');
    }
  };

  changeOptionId = optionId => {
    this.setState({ optionId: optionId });
  };

  keepShoppingBtn = () => {
    if (this.state.optionId === '') {
      alert('옵션을 선택해주세요');
    }

    fetch(`${API.CART}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        productId: this.props.productId,
        optionId: this.state.optionId,
        quantity: this.state.itemCount,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'SUCCESS') {
          alert(
            `장바구니에 ${this.props.title}(${this.state.optionName}) 상품이 추가되었습니다.`
          );
          this.props.cancelModal();
        }
      });
  };

  moveToCart = () => {
    if (this.state.optionId === '') {
      alert('옵션을 선택해주세요');
    }
    fetch(`${API.CART}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        productId: this.props.productId,
        optionId: this.state.optionId,
        quantity: this.state.itemCount,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'SUCCESS') {
          alert(
            `장바구니에 ${this.props.title}(${this.state.optionName}) 상품이 추가되었습니다.`
          );
          this.props.history.push('/cart');
        }
      });
  };

  changeOptionName = optionName => {
    this.setState({ optionName: optionName });
  };

  render() {
    const { isMenu, itemCount } = this.state;
    const { title, price, options } = this.props;

    return (
      <section className="backgroundContainer">
        <div className="modalContainer" onClick={e => e.stopPropagation()}>
          <h3 className="modalTitle">{title}</h3>
          <div className="countContainer">
            <div className="minusBox" onClick={this.handleMinusOption}>
              <i className="fas fa-minus"></i>
            </div>
            <p className="countNum">{itemCount}</p>
            <div className="plusBox" onClick={this.handlePlusOption}>
              <i className="fas fa-plus"></i>
            </div>
          </div>

          <div className="optionContainer">
            <p className="optionText">옵션선택</p>

            <div className="dropdownBtn" onClick={this.handleMenuClick}>
              <button className="optionBtn">
                {this.state.optionName
                  ? this.state.optionName
                  : '옵션을 선택해주세요'}
              </button>
            </div>
            {isMenu && (
              <Options
                options={options}
                changeOptionId={this.changeOptionId}
                handleMenuClick={this.handleMenuClick}
                changeOptionName={this.changeOptionName}
              />
            )}
          </div>
          <p className="totalPrice">{(price * itemCount).toLocaleString()}원</p>
          <div className="buttonContainer">
            <button className="modalBtn buy" onClick={this.moveToCart}>
              장바구니
            </button>
            <button className="modalBtn cart" onClick={this.keepShoppingBtn}>
              계속쇼핑
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(CartModal);
