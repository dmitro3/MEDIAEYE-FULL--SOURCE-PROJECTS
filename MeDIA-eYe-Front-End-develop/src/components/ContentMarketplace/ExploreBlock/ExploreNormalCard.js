import React, { useEffect, useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import Slider from 'react-slick';
import { queryFileType, GetNetworkIcon } from '../../../blockchain/functions/Utils';
import { queryCollection } from '../../../blockchain/functions/Collection';
import { Model3d } from '../../3d/Model3d';
import { Heart, ImagePlug } from '../../Icons/';
import './ExploreBlock.scss';
import { queryLikesNFT } from '../../../blockchain/functions/Likes';
import { couldStartTrivia } from 'typescript';
const ExploreNormalCard = (props) => {
    const { product } = props;
    const sliderRef = useRef();
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState();
    const [collection, setCollections] = useState(null);
    const { isInitialized, Moralis } = useMoralis();
    const [currentSlide, setCurrentSlide] = useState(1);
    const [enableHover, setEnableHover] = useState(false);
    const getLikes = async () => {
        if (product?.collectionAddress && product?.tokenId) {
            const { count, likeStatus } = await queryLikesNFT(
                Moralis,
                product?.collectionAddress,
                product?.tokenId,
                product?.chainId
            );
            setLikesCount(count);
            setIsLiked(likeStatus);
        }
    };
    const getCollection = async () => {
        if (product?.collectionAddress) {
            const result = await queryCollection(
                Moralis,
                product?.collectionAddress
            );
            setCollections(result);
        }
    };
    useEffect(async () => {
        // getCollection();
        //  getLikes();
    }, [product]);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        slidesPerRow: 1,
        arrows: false,
        autoplaySpeed: 1500,
        autoplay: false,
        beforeChange: (current, next) => setCurrentSlide(next + 1)
    };
    const [mimetype, setMimetype] = useState(null);
    const [productImage, setProductImage] = useState([]);
    useEffect(async () => {
        let productimg = (typeof product?.img === 'string') ? Array(product?.img) : product?.img;
        setProductImage(productimg);
        let fileTypes = [];
        for (let i = 0; i < productimg?.length; i++) {
            const fileType = await Moralis.Cloud.run('queryFileType', {
                url: productimg[i]
            });

            fileTypes.push(fileType);
        }
        setMimetype(fileTypes);
    }, [product?.img]);
    useEffect(() => {
        if (enableHover) {
            sliderRef?.current?.slickPlay();
        } else {
            sliderRef?.current?.slickPause();
        }
    }, [enableHover]);
    return (
        <>
            <div className='mediaeye-nft-card'>
                <div className='mediaeye-nft-card-inner mediaeye-nft-card-inner-normal' onMouseLeave={() => { setEnableHover(false); }} onMouseEnter={() => { setEnableHover(true); }}>
                    <div className='mediaeye-nft-card-inner-imgbox'>
                        {productImage && mimetype ? (
                            <Slider {...settings} ref={sliderRef}>
                                {
                                    productImage?.map((image, i) => (
                                        mimetype[i] === 'video/mp4' ? (
                                            <div className='mediaeye-nft-card-inner-imgbox-slide'>
                                                <video
                                                    preload="metadata"
                                                    src={image}
                                                    playsInline
                                                    controlsList="nodownload"
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ) : mimetype[i] === 'model/gltf+json' ||
                                            mimetype[i] === 'model/gltf-binary' ||
                                            mimetype[i] === 'text/plain' ||
                                            mimetype[i] === 'application/json' ||
                                            mimetype[i] === 'text/plain; charset=utf-8' ||
                                            mimetype[i] === 'text/html' ? (
                                            <div className='mediaeye-nft-card-inner-imgbox-slide'>
                                                <Model3d model={image} type={mimetype[i]} />
                                            </div>
                                        ) : (
                                            <div className='mediaeye-nft-card-inner-imgbox-slide'><img src={image} /></div>
                                        )
                                    ))
                                }

                            </Slider>
                        ) : <ImagePlug />}
                    </div>
                    <div className='mediaeye-nft-card-inner-content'>
                        <div className='mediaeye-nft-card-inner-content-inner'>
                            <div class="mediaeye-nft-card-inner-content-top">
                                <div class="mediaeye-nft-card-inner-content-top-left">
                                    <div class="mediaeye-nft-card-inner-content-collection">{collection?.attributes?.name}</div>
                                    <div class="mediaeye-nft-card-inner-content-title">{product?.title}</div></div></div>
                            <div class="mediaeye-nft-card-inner-content-detail">
                                <div class="mediaeye-nft-card-inner-content-detail-left">
                                    <div class="mediaeye-nft-card-inner-content-detail-left-count">
                                        <span><Heart />  {likesCount}</span>
                                    </div>
                                </div>
                                <div class="mediaeye-nft-card-inner-content-detail-right">
                                    <div class="mediaeye-nft-card-inner-content-detail-right-label">Price </div>
                                    <div class="mediaeye-nft-card-inner-content-detail-right-price"><img src="/img/token/34/BNB.png" alt="Token" />0.0001</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExploreNormalCard;
