import React, { useEffect, useMemo, useState } from 'react';
import './Faq.scss';
import faqData from './FaqList';

// Images & Media
import arrow from '../../assets/img/faq_arrow.png';
import arrow_dark from '../../assets/img/faq_arrow_dark.png';
import { useSelector } from 'react-redux';

const FaqItem = ({ question, Answer }) => {
  const darkTheme = useSelector((state) => state.app.darkTheme);
  const [active, setActive] = useState(false);
  const [pRef, setPRef] = useState(null);
  const [ref, setRef] = useState(null);
  const styles = useMemo(
    () => ({
      height: active ? ref.scrollHeight + 'px' : 0
    }),
    [active]
  );

  const clickOutTheWindow = (ev) => {
    if (
      pRef !== null &&
      ev.target.closest('.mediaeye-layout-container-faq-wrapper-main-block') !==
        pRef
    ) {
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', clickOutTheWindow);

    return () => window.removeEventListener('click', clickOutTheWindow);
  }, [ref]);

  return (
    <div
      className={
        active
          ? 'mediaeye-layout-container-faq-wrapper-main-block animate__animated animate__fadeIn wow active'
          : 'mediaeye-layout-container-faq-wrapper-main-block animate__animated animate__fadeIn wow'
      }
      data-wow-duration="1s"
      data-wow-delay="0.5s"
      ref={setPRef}
    >
      <div
        className="mediaeye-layout-container-faq-wrapper-main-block-quest"
        onClick={() => setActive(!active)}
      >
        <h5>{question}</h5>
        <img
          className={active ? 'active' : null}
          src={darkTheme ? arrow : arrow_dark}
          alt="arrow"
        />
      </div>
      <div
        className={
          active
            ? 'mediaeye-layout-container-faq-wrapper-main-block-content active'
            : 'mediaeye-layout-container-faq-wrapper-main-block-content'
        }
        style={styles}
        ref={setRef}
      >
        <div className="mediaeye-layout-container-faq-wrapper-main-block-content-box">
          <Answer />
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const scrollTopHandler = (ev) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="mediaeye-layout-section withspace">
      <div className="mediaeye-layout-content withfulllayout">
        <div className="mediaeye-layout-container">
          <div className="mediaeye-layout-container-faq" id="faq">
            <div className="mediaeye-layout-container-faq-wrapper">
              <h2 className="mediaeye-layout-container-faq-wrapper-title">
                Faq
              </h2>
              <div className="mediaeye-layout-container-faq-wrapper-main">
                {faqData.map((item) => (
                  <FaqItem key={item.id} {...item} />
                ))}
              </div>
            </div>
            {/* <button
                            className="mediaeye-layout-container-faq-arrow_top"
                            onClick={scrollTopHandler}
                        >
                            <img 
                                src={arrowTop}
                                alt="arrow_top"
                            />
                        </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
