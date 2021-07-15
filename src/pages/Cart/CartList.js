import React, { Component } from 'react';

export default class CartList extends Component {
  render() {
    return (
      <div>
        <ul>
          <div className={`${this.props.stock === 0 ? 'test' : ''}`}>
            <li className={`itemList `}>
              <img src={this.props.thumbnail} alt="itemIm" />
              <div className="infoContainer">
                <p className="productName">{this.props.name}</p>
                <p className="selectOption">{this.props.option}</p>
              </div>
              <p className="cartWeight">{Math.floor(this.props.grams)}g 기준</p>
              <div className="counterContainer">
                <div>
                  <i
                    className="fas fa-minus"
                    onClick={() =>
                      this.props.quantityMinus(
                        this.props.cartItemId,
                        this.props.cartIndex,
                        this.props.stock
                      )
                    }
                  ></i>
                </div>
                <p>{this.props.quantity}</p>
                <div>
                  <i
                    className="fas fa-plus"
                    onClick={() =>
                      this.props.quantityPlus(
                        this.props.cartItemId,
                        this.props.cartIndex,
                        this.props.stock
                      )
                    }
                  ></i>
                </div>
              </div>
              <div className="itemPrice">
                <p>
                  {this.props.stock !== 0
                    ? Math.floor(
                        this.props.price * this.props.quantity
                      ).toLocaleString()
                    : '품절된 상품'}
                </p>
              </div>
              <button
                className="deleteBtn"
                onClick={() => this.props.deleteCartItem(this.props.cartItemId)}
              >
                <i class="far fa-times-circle"></i>
              </button>
            </li>
          </div>
        </ul>

        {/* {this.props.stock === 0 && <div>없음</div>} */}
      </div>
    );
  }
}
