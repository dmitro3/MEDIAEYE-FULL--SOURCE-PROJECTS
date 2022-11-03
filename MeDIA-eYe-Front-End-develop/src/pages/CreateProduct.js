import React from 'react';
import { Helmet } from 'react-helmet';
import LandingPage2 from '../components/CreateProduct/CreateProduct/LandingPage2';
import MetagateNewPage from '../components/MetagateNew/MetagateNewPage';

const CreateProduct = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <Helmet>
        <meta property="og:url" content={window.location.origin + '/create'} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Gateway to the Metaverse, Web 3.0, and Decentralized Economies |MEDIA EYE"
        />
        <meta
          property="og:description"
          content="NFTs are opening new frontiers for digital content value creation, direct marketing, promotions and conten delivery"
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/metagate.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/create" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/create'}
        />
        <meta
          name="twitter:title"
          content="Gateway to the Metaverse, Web 3.0, and Decentralized Economies |MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="NFTs are opening new frontiers for digital content value creation, direct marketing, promotions and conten delivery"
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/metagate.png'}
        />
        <title>
          Gateway to the Metaverse, Web 3.0, and Decentralized Economies |MEDIA
          EYE
        </title>
        <meta
          name="description"
          content="NFTs are opening new frontiers for digital content value creation, direct marketing, promotions and conten delivery"
        />
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content bottomnospace"
      >
        {/* <CreateProductMain /> */}
        <MetagateNewPage />
      </div>
    </React.Fragment>
  );
};

export default CreateProduct;
