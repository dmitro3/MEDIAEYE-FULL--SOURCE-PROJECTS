import React from 'react';
import { Link } from 'react-router-dom';

import './ProductItemBlock.scss';

const BannerItem = (props) => {
  const { product, title } = props;
  const itemhtml = (contents) => {
    return contents.map((content, i) => {
      return (
        <Link to="" className="mediaeye-products-card-inner" key={i}>
          <img
            src={content?.img}
            alt={content?.title}
            BannerItem
            className="mediaeye-products-card-inner-img"
          />
          <div className="mediaeye-products-card-inner-content">
            <div className="mediaeye-products-card-inner-content-title">
              {content?.title}
            </div>
            <div className="mediaeye-products-card-inner-content-des">
              {content?.des}
            </div>
          </div>
        </Link>
      );
    });
  };
  return (
    <div className="mediaeye-products-col">
      {product.map((item, i) => (
        <div
          className={
            item.type === 'small'
              ? 'mediaeye-products-card mediaeye-products-card-small'
              : 'mediaeye-products-card'
          }
        >
          {itemhtml(item.content)}
        </div>
      ))}
    </div>
  );
};

export default BannerItem;
