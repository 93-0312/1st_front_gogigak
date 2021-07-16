import React from 'react';
import { withRouter } from 'react-router';

import './Category.scss';

class Category extends React.Component {
  handleClick = () => {
    this.props.history.push(`/List?category=${this.props.title}`);
  };

  render() {
    const { title, name } = this.props;
    const { search } = this.props.location;

    return (
      <li className={title} key={title} onClick={() => this.handleClick()}>
        <p
          className={`${
            title === search.slice(10) ? 'category-activated' : 'category'
          }`}
        >
          {name}
        </p>
      </li>
    );
  }
}

export default withRouter(Category);
