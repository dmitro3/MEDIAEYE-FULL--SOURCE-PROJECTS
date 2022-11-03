import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { groupOfArray } from '../../utils/groupOfArray';
import { Pagination } from 'swiper';
import { NavLink, useHistory } from 'react-router-dom';
import './FeaturedEvents.scss';
import live from '../../assets/img/live-btn.png';
import featureImage from '../../assets/img/featured-events-placeholder.png';
import usernameImage from '../../assets/img/username-placeholder.png';
import { useDispatch } from 'react-redux';

const zRegnent = {
  category: 'Entertainment',
  charity: false,
  dateEnd: '20.04.2021',
  dateStart: '17.04.2021',
  id: 2,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed...',
  title: 'NFT Crypto Comicon'
};

const FeaturedEventsItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { category, charite, dateEnd, dateStart, id, text, title } = props;

  return (
    <div className="feev-item">
      <div className="feev-item-inner">
        <NavLink to="/event" className="feev-item__img">
          <img src={featureImage} alt="img" />
        </NavLink>
        <div className="feev-item__content">
          <NavLink to="/#path" className="feev-item__username">
            <img src={usernameImage} alt="img" />
            <span>@Username</span>
            <img
              style={{ width: '74px', marginLeft: '12px' }}
              src={live}
              alt="LiveBtn"
            />
          </NavLink>
          <ul className="awb-item__list feev-item__list">
            <li className="awb-item__list-item feev-item__list-item awb-clnd">
              {dateEnd}
            </li>
            <li className="awb-item__list-item feev-item__list-item awb-pers">
              555
            </li>
            <li className="awb-item__list-item feev-item__list-item awb-likes">
              3k
            </li>
          </ul>

          <h3 className="feev-item__title">{title}</h3>
          <p className="feev-item__text">{text}</p>
          <div className="feev-item__controls">
            <button className="feev-item__btn-art">
              <span>Art</span>
            </button>
            {/* <ul className="awb-item__list feev-item__list feev-item__list_mobile">
                        <li className="awb-item__list-item feev-item__list-item awb-clnd">{dateEnd}</li>
                        <li className="awb-item__list-item feev-item__list-item awb-pers">555</li>
                    </ul> */}
            <button className="feev-item__btn-join">
              <span>Join</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedEvenets = ({ list }) => {
  const [wwidth, setWwidth] = useState(window.innerWidth);

  const resizeHandler = () => {
    if (wwidth !== window.innerWidth) {
      setWwidth(window.innerWidth);
    }
  };

  const settings = {
    slidesPerView: 1,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.feev-pagination',
      enable: true,
      clickable: true
    },
    breakpoints: {
      889: {
        slidesPerView: 2
      },
      1181: {
        slidesPerView: 3
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, [wwidth]);

  return (
    <div className="feev">
      {wwidth > 888 ? (
        <Swiper {...settings} className="feev-slider">
          {groupOfArray(list, 2).map(([item1, item2], id) => (
            <SwiperSlide key={id} className="feev-slider-item">
              <FeaturedEventsItem {...item1} />
              {item2 && <FeaturedEventsItem {...item2} />}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper {...settings} className="feev-slider">
          {list.map((item) => (
            <SwiperSlide key={item.id} className="feev-slider-item">
              <FeaturedEventsItem {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="awb-pagination feev-pagination"></div>
    </div>
  );
};

export default FeaturedEventsItem;
