import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DetailTop from './DetailTop';
import DetailDescContationer from './DetailDescContationer';
import { API } from '../../config';

import './Detail.scss';

export class Detail extends Component {
  constructor(props) {
    super(props);
    //state생성
    this.state = {
      productInfo: {},
      isTabOn: false,
    };
  }
  //mockdata받기
  componentDidMount() {
    const authToken = localStorage.getItem('token');
    fetch(
      `http://ambitiouskyle.iptime.org:6389/products/${this.props.match.params.product}`,
      {
        headers: {
          authorization: authToken,
        },
      }
    )
      .then(results => results.json())
      .then(results => {
        this.setState({
          productInfo: results.results,
        });
      });
  }
  //tab toggle btn
  onClickToggleHandler = () => {
    this.setState({
      isTabOn: !this.state.isTabOn,
    });
  };
  render() {
    const { productInfo } = this.state;
    console.log('state', productInfo);
    //console.log('options', this.state.productInfo.options);
    //console.log('tabOn', this.state.isTabOn);
    return (
      <div className="detail-wrap">
        {productInfo.name && (
          <>
            <DetailTop
              productImg={productInfo.thumbnail}
              productName={productInfo.name}
              productStandard={productInfo.pricePer100g}
              productPrice={productInfo.price}
              productOption={productInfo.options}
              productId={this.props.match.params.product}
              productGrams={productInfo.grams}
            />
            <div className="detail-tab">
              <ul>
                <li>
                  <Link
                    className={!this.state.isTabOn ? 'active' : null}
                    onClick={this.onClickToggleHandler}
                  >
                    상품설명
                  </Link>
                </li>
                <li>
                  <Link
                    className={this.state.isTabOn ? 'active' : null}
                    onClick={this.onClickToggleHandler}
                  >
                    상품리뷰
                  </Link>
                </li>
              </ul>
            </div>
            <DetailDescContationer
              DesImg={productInfo.images}
              DesDate={productInfo.butcheredDate}
              productCloseBtn={productInfo.isOrganic}
              tabToggle={this.state.isTabOn}
            />
          </>
        )}
      </div>
    );
  }
}

export default Detail;
