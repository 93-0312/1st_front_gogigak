import React from 'react';
import { withRouter } from 'react-router-dom';
import CartModal from '../Modal/CartModal';
import './Item.scss';

class Item extends React.Component {
  state = {
    isModal: false,
  };

  handleClick = e => {
    this.setState({ isModal: !this.state.isModal });
    e.stopPropagation();
  };

  cancelModal = () => {
    this.setState({ isModal: !this.state.isModal });
  };

  goToDetail = () => {
    this.props.history.push(`/Detail/${this.props.id}`);
  };

  render() {
    const { title, img, gram, price, options, id } = this.props;
    const { isModal } = this.state;
    console.log(this.props.stock);
    return (
      <li className="item" onClick={this.goToDetail}>
        <div className="imgContainer">
          <img src={img} alt="itemImg" />
          <div className="cartBackground" onClick={this.handleClick}>
            {isModal && (
              <CartModal
                price={price}
                title={title}
                options={options}
                productId={id}
                cancelModal={this.cancelModal}
                stock={this.props.stock}
              />
            )}
            <i className="fas fa-shopping-cart"></i>
          </div>
        </div>
        <h6 className="itemTitlte">{title}</h6>
        <p className="priceInfo">
          기준가 {price}원/{gram}g
        </p>
      </li>
    );
  }
}

export default withRouter(Item);
