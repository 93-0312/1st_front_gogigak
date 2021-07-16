import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CommnetList extends Component {
  render() {
    return (
      <li className="detail-review-container">
        <Link to="#!">
          <div className="detail-review-box">
            <div className="detail-review-info">
              <div className="detail-review-top-wrap">
                <h6>{this.props.title}</h6>
                <button
                  onClick={() =>
                    this.props.deletedComment(this.props.commentId)
                  }
                  className={this.props.productCloseBtn ? '' : 'off'}
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div className="detail-review-content-wrap">
                <p>{this.props.comment}</p>
              </div>
              <div className="detail-review-customer">
                <p>심익현</p>
                <p className="count">{this.props.puserchase_count}회 구매</p>
                <time dateTime="2021-07-06">{this.props.created_at}</time>
              </div>
            </div>
          </div>
          <div className="detail-review-width-product">
            <div className="product-wrap-num">
              함께 구매하신 상품<span className="num">{this.props.key}</span>
            </div>
            <div className="product-name-num">초신선 돼지고기 x 3</div>
          </div>
        </Link>
      </li>
    );
  }
}

export default CommnetList;
