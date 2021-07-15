import React, { Component } from 'react';
import Item from '../../components/Item/Item';
import SlideImg from './SlideImg';
import { API } from '../../config';
import './Main.scss';

export default class Main extends Component {
  state = {
    slideIndex: 0,
    mainSlideImage: [],
    items: [],
  };

  slideContainer = React.createRef();
  btn = React.createRef();

  componentDidMount() {
    fetch(API.SLIDE, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(result => this.setState({ mainSlideImage: result }));

    fetch(`${API.LIST}?sort=sales`)
      .then(res => res.json())
      .then(result => this.setState({ items: result.results }));

    setInterval(this.slideNext, 3000);
  }

  slideNext = () => {
    if (this.state.slideIndex < 4) {
      this.setState({ slideIndex: this.state.slideIndex + 1 }, () => {
        this.slideContainer.current.style.transition = '  transform 2s';
        this.slideContainer.current.style.transform = `translateX(-${
          1184 * this.state.slideIndex
        }px)`;
      });
    } else {
      this.setState({ slideIndex: -1 });
    }
  };

  render() {
    const { items } = this.state;
    return (
      <div className="mainPage">
        <div className="slideOverFlow">
          <div className="slideContentContainer" ref={this.slideContainer}>
            {this.state.mainSlideImage.results &&
              this.state.mainSlideImage.results.map(img => (
                <SlideImg image={img.image} />
              ))}
          </div>
        </div>

        <section className="bestItemContainer">
          <div className="bestItemList">정육각 베스트 상품</div>
          <ul className="bestItems">
            {items.items &&
              items.items.map((item, idx) => {
                if (idx < 6) {
                  return (
                    <Item
                      key={idx}
                      id={item.id}
                      img={item.thumbnail}
                      price={item.price}
                      gram={item.grams}
                      title={item.name}
                      options={item.options}
                      stock={item.stock}
                    />
                  );
                }
              })}
          </ul>
        </section>
        <div
          className="shoppingBanner"
          onClick={() => {
            window.scrollTo(0, 0);
            this.props.history.push('./list');
          }}
        />
      </div>
    );
  }
}
