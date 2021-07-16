import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DetailDateDisplay from './DetailDateDisplay';
import CommnetList from './CommnetList';

export class DetailDescContationer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: '',
      textAreaValue: '',
      commentList: [],
      blankValue: '',
      detailImgUrl: '',
      imgUrl: '',
      commentValue: '',
      value: '',
    };
  }

  //버튼 클릭 이벤트와 함수 생성 서버 연결
  addComment = e => {
    const authToken = localStorage.getItem('token');

    fetch(
      `http://ambitiouskyle.iptime.org:6389/products/${this.props.match.params.product}/reviews`,
      {
        method: 'POST',
        headers: {
          authorization: authToken,
        },
        body: JSON.stringify({
          imageUrl: '',
          title: this.state.titleValue,
          content: this.state.textAreaValue,
        }),
      }
    )
      .then(res => res.json())
      .then(res => {
        e.preventDefault();
        const { commentList } = this.state; //구조분해할당
        this.setState({
          commentList: commentList.concat({
            content: this.state.textAreaValue,
            title: this.state.titleValue,
          }),
          textAreaValue: '',
          titleValue: '',
          value: '',
        });
      });
  };
  //state 상태 핸들러
  handleCommentInput = e => {
    this.setState({
      titleValue: e.target.value,
      value: e.target.value, //this.state를 다시 빈 분자열로
    });
  };
  handleCommentTextArea = e => {
    this.setState({
      textAreaValue: e.target.value,
      value: e.target.value, //this.state를 다시 빈 분자열로
    });
  };
  //commentList목데이터
  componentDidMount = () => {
    console.log(this.props.match.params.product);
    const reviewToken = localStorage.getItem('token');
    console.log(reviewToken);
    fetch(
      `http://ambitiouskyle.iptime.org:6389/products/${this.props.match.params.product}/reviews`,
      {
        headers: { authorization: reviewToken },
      }
    )
      .then(results => {
        return results.json();
      })
      .then(results => {
        this.setState({
          commentList: results.results,
        });
      });
  };
  //deleteComment리뷰삭제
  deletedComment = id => {
    console.log('id', id);
    const reviewToken = localStorage.getItem('token');
    fetch(`http://ambitiouskyle.iptime.org:6389/products/reviews/${id}`, {
      method: 'DELETE',
      headers: { authorization: reviewToken },
    })
      .then(response => {
        response.json();
      })
      .then(response => {
        alert('리뷰를 삭제하셨습니다.');
        this.setState({
          commentList: this.state.commentList.filter(el => el.id !== id),
        });
      });
  };
  render() {
    const { DesImg } = this.props;
    const { commentList } = this.state;
    console.log('tabOn', this.props.tabToggle);
    return (
      <div className="detail-product-wrap">
        <section
          className={
            !this.props.tabToggle
              ? 'detail-desc-wrap active'
              : 'detail-desc-wrap'
          }
        >
          <article>
            {DesImg && <img src={this.props.DesImg[0].imageUrl} />}
          </article>
          <DetailDateDisplay DesDate={this.props.DesDate} />
          <article>
            {DesImg && <img src={this.props.DesImg[1].imageUrl} />}
          </article>
        </section>
        <section
          className={
            this.props.tabToggle ? 'detail-review active' : 'detail-review'
          }
        >
          <form onSubmit={this.addComment}>
            <ul>
              <li className="detail-review-photo-container review-write">
                <div className="detail-review-wrtie-wrap">
                  <div className="detail-review-box">
                    <form>
                      <div className="detail-review-info">
                        <label>
                          <input
                            type="text"
                            name="title"
                            value={this.state.titleValue}
                            onChange={this.handleCommentInput}
                          ></input>
                        </label>
                        <div className="detail-review-content-wrap">
                          <textarea
                            value={this.state.textAreaValue}
                            onChange={this.handleCommentTextArea}
                          ></textarea>
                        </div>
                        <div className="detail-review-customer">
                          <p>심익현</p>
                          <p className="count">1회 구매</p>
                          <time dateTime="2021-07-06">2021-07-06</time>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="detail-review-photo-wrap">
                    <div className="img-wrap">
                      <img
                        src="http://placehold.it/235x236"
                        alt="업로드 이미지"
                      />
                    </div>
                    <input type="file" />
                  </div>
                </div>
                <div className="detail-review-width-product">
                  <div className="product-wrap-num">
                    함께 구매하신 상품<span className="num">(3)</span>
                  </div>
                  <div className="product-name-num">초신선 돼지고기 x 3</div>
                  <div className="btn-wrap">
                    <button onClick={this.state.addComment}>후기 등록</button>
                  </div>
                </div>
              </li>
              {/* 사진이 있는 코멘트 진행할떄 주척 풀기
             <li className="detail-review-photo-container">
              <Link to="#!">
                <div className="detail-review-box">
                  <div className="detail-review-info">
                    <h6>맛있어요~~</h6>
                    <div className="detail-review-content-wrap">
                      <p>잘 먹었습니당...</p>
                    </div>
                    <div className="detail-review-customer">
                      <p>심익현</p>
                      <p className="count">1회 구매</p>
                      <time dateTime="2021-07-06">2021-07-06</time>
                    </div>
                  </div>
                  <div className="detail-review-photo-wrap">
                    <img src="https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20210706_004726_dM3DZtguSt6BzAff9yc3s6_3abba3fe-f54e-4f3c-920d-01b1347e5c84.jpg?alt=media&token=e5753d84-9958-4837-9481-9337d288b3aa" />
                  </div>
                </div>
                <div className="detail-review-width-product">
                  <div className="product-wrap-num">
                    함께 구매하신 상품<span className="num">(3)</span>
                  </div>
                  <div className="product-name-num">초신선 돼지고기 x 3</div>
                </div>
              </Link>
            </li> */}
              {/* <CommnetList /> */}
              {commentList &&
                commentList.map(el => {
                  return (
                    <CommnetList
                      key={el.id}
                      commentId={el.id}
                      title={el.title}
                      comment={el.content}
                      created_at={el.created_at}
                      puserchase_count={el.purchase_count}
                      deletedComment={this.deletedComment}
                      productCloseBtn={this.props.productCloseBtn}
                    />
                  );
                })}
            </ul>
          </form>
          {/* <button className="detail-review-more"></button> */}
        </section>
        <section className="detail-info"></section>
      </div>
    );
  }
}

export default withRouter(DetailDescContationer);
