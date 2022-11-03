import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useMoralis } from 'react-moralis';
import { useHistory, Link } from 'react-router-dom';
import './CategoriesBlock.scss';
const CategoriesBlock = (props) => {
    const { category } = props;
    let history = useHistory();
    const { user, isInitialized, Moralis } = useMoralis();
    const dispatch = useDispatch();
    const cardRef = useRef(null);



    return (
        <>
            <div className="mediaeye-categories-card">
                <Link
                    className={`mediaeye-categories-card-inner`} to={`/nft-marketplace?q_cat=${category?.title}`}>
                    <div className="mediaeye-categories-card-inner-content">
                        <div className="mediaeye-categories-card-inner-content-title">
                            {category?.title}
                        </div>
                    </div>
                    <div className="mediaeye-categories-card-inner-imgbox">
                        {category?.img ? (
                            <img
                                className="mediaeye-categories-card-inner-imgbox-img"
                                src={category?.img}
                                alt={category?.title}
                            />
                        ) : null}
                    </div>
                </Link>
            </div>
        </>
    );
};

export default CategoriesBlock;
