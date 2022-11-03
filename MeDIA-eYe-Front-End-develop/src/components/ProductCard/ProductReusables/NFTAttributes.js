import { useState, useEffect } from 'react';
import { queryNFTCollection } from '../../../blockchain/functions/Account';
import { useMoralis } from 'react-moralis';
import { roundString } from '../../../blockchain/functions/Utils';
import { Link } from 'react-router-dom';
export const NFTAttributes = ({ nft, activeTab }) => {
  const [attributes, setAttributes] = useState({});
  const [collectionTotal, setCollectionTotal] = useState(1);
  const { Moralis, isInitialized } = useMoralis();

  useEffect(() => {
    const populateAttributes = async () => {
      if (!nft?.attributes?.length || nft?.attributes[0]?.trait_type) {
        await getAttributes();
      }
    };
    populateAttributes();
  }, []);

  const getAttributeCounts = (attributeArray) => {
    const trait_types = nft?.attributes?.reduce((map, obj) => {
      // don't include stats/levels in calculation
      if (!(obj.max_value || obj.display_type)) {
        map[obj.trait_type] = { value: obj.value, count: 0 };
      }

      return map;
    }, {});

    attributeArray.forEach((e) => {
      if (!e) {
        return;
      }
      e.forEach((trait) => {
        const type = trait.trait_type;
        const val = trait.value;

        const seen = new Set();

        if (trait_types[type]?.value === val && !seen.has(type)) {
          seen.add(type);
          trait_types[type].count++;
        }
      });
    });
    setAttributes(trait_types);
  };

  const getAttributes = async () => {
    const { results, count } = await queryNFTCollection(
      Moralis,
      nft?.collectionAddress
    );

    const unpackedAttributes = results.map((e) => {
      return e.attributes.attributes;
    });
    setCollectionTotal(count);
    getAttributeCounts(unpackedAttributes);
  };

  const getNFTAttributes = () => {
    const flatAttributes = [];
    for (let key in attributes) {
      flatAttributes.push({ trait_type: key, ...attributes[key] });
    }
    if (flatAttributes.length > 0) {
      return (
        <div className="mediaeyeproduct-properties-row">
          {flatAttributes.map((item) => (
            <div
              className="mediaeyeproduct-properties-row-col"
              key={item.trait_type}
            >
              <Link
                to="/nft-marketplace"
                className="mediaeyeproduct-properties-row-col-inner"
              >
                <div className="mediaeyeproduct-properties-row-col-inner-title">
                  {item.trait_type}
                </div>
                <div className="mediaeyeproduct-properties-row-col-inner-subtitle">
                  {item.value}
                </div>
                <div className="mediaeyeproduct-properties-row-col-inner-des">
                  {roundString((item.count / collectionTotal) * 100, 2)}% have
                  this trait
                </div>
                {/* <div className="mediaeyeproduct-properties-row-col-inner-rarity">
            {item.count}% Rarity
          </div> */}
              </Link>
            </div>
          ))}
        </div>
      );
    } else {
      return <></>;
    }
  };

  const getNFTLevels = () => {
    const flatLevels = nft?.attributes?.filter((level) => {
      return level.max_value && !level.display_type;
    });

    return flatLevels.map((level) => (
      <div className="mediaeyeproduct-levels-row" key={level.trait_type}>
        <div className="mediaeyeproduct-levels-row-col">
          <div className="mediaeyeproduct-levels-row-col-name">
            {level.trait_type}
          </div>
        </div>
        <div className="mediaeyeproduct-levels-row-col">
          <div className="mediaeyeproduct-levels-row-col-progress">
            <div className="mediaeyeproduct-levels-row-col-progress-info">
              {level.value} <span>&nbsp;|&nbsp; {level.max_value}</span>
            </div>
            <div className="mediaeyeproduct-levels-row-col-progress-line">
              <div
                className="mediaeyeproduct-levels-row-col-progress-line-fill"
                style={{
                  width:
                    roundString((level.max_value / level.value) * 100, 2) + '%'
                }}
              ></div>
            </div>
          </div>
        </div>
        {/* <div className="mediaeyeproduct-levels-row-col">
          <div className="mediaeyeproduct-levels-row-col-have">
            {roundString(100 - ((level.max_value / level.value) * 100, 2))}%
            have <br />
            this trait
          </div>
        </div> */}
      </div>
    ));
  };

  const getNFTStats = () => {
    const flatStats = nft?.attributes?.filter((stat) => {
      return stat.max_value && stat.display_type === 'number';
    });
    return flatStats.map((stat) => (
      <div className="mediaeyeproduct-levels-row" key={stat.trait_type}>
        <div className="mediaeyeproduct-levels-row-col">
          <div className="mediaeyeproduct-levels-row-col-name">
            {stat.trait_type}
          </div>
        </div>
        <div className="mediaeyeproduct-levels-row-col">
          <div className="mediaeyeproduct-levels-row-col-progress">
            <div className="mediaeyeproduct-levels-row-col-progress-info stats">
              <div className="text-right">
                {' '}
                {stat.value} <span>&nbsp;|&nbsp; {stat.max_value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const GET_METADATA = {
    Properties: getNFTAttributes,
    Levels: getNFTLevels,
    Stats: getNFTStats
  };

  return <>{GET_METADATA[activeTab]()}</>;
};
