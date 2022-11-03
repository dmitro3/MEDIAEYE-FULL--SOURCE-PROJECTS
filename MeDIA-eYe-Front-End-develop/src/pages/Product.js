import React, { useEffect, useState } from 'react';
import ProductSingle from '../components/ProductCard/Product/ProductSingle';
import { useParams, useHistory } from 'react-router-dom';
import { queryNFT } from '../blockchain/functions/Account';
import { useMoralis } from 'react-moralis';
import { ChainHexString } from '../blockchain/functions/ChangeChain/ChainHexStrings';

const Product = (props) => {
  const { closeNftCollapse } = props;
  const history = useHistory();
  const { address, tokenId, chain } = useParams();
  const { Moralis, isInitialized } = useMoralis();
  const [nft, setNft] = useState(null);

  const loadSingleNFTData = async () => {
    const nft = await queryNFT(Moralis, {
      colAddress: address,
      chainId: ChainHexString(chain),
      tokenId: tokenId
    });
    // if none found at address/tokenId redirect
    if (!nft) {
      history.replace('/404');
    } else {
      const newNFT = {
        id: nft.id,
        animation_url: nft?.attributes?.animation_url,
        collectionAddress: nft.attributes.collectionAddress,
        collectionType: nft.attributes.collectionType,
        chainId: nft.attributes.chainId,
        description: nft.attributes.description,
        fullImage: nft.attributes.image,
        img: nft.attributes.image,
        minter: nft.attributes.minter,
        title: nft.attributes.name,
        tokenId: nft.attributes.tokenId,
        totalTokens: nft.attributes.totalTokens,
        attributes: nft.attributes.attributes,
        rarity: nft.attributes.rarity,
        fileType: nft.attributes.fileType,
        unlockableContentId: nft.attributes.unlockableContentId
      };
      await setNft(newNFT);
    }
  };

  useEffect(() => {
    if (isInitialized && address && tokenId) {
      loadSingleNFTData();
    }
  }, [isInitialized, address, tokenId]);

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="product-page mediaeye-layout-content"
      >
        <ProductSingle nft={nft} />
      </div>
    </React.Fragment>
  );
};

export default Product;
