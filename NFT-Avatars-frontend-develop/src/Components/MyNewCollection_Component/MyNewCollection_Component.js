import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyNewCollection_Component.scss";
import Heart from "../../Components/icons/Heart";
import Addicon from "../../Components/icons/Add_icon";
import { avatarService, baseUrl, collectionService } from "../../services/api.service";
import { useSearchParams } from "react-router-dom";

const MyNewCollection_Component = () => {
  const [avatars, setAvatars] = useState([]);
  const [selAvatars, setSelAvatars] = useState([]);
  const [collection, setCollection] = useState();
  const navigate = useNavigate();

  // const { library, chainId } = useWeb3React();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchCollection() {
      const id = searchParams.get('collection');
      const res = await collectionService.fetchOne(id);
      setCollection(res);
    }
    fetchCollection();
  }, []);

  // mint to collection
  const mintCollection = async () => {
    if(selAvatars.length <= 0) return;
    // make metadata
    let metadataArray = [];
    for(let i = 0; i < selAvatars.length; i++) {
      metadataArray.push({
        name: `${collection.name} #${i + 1}`,
        description: collection.description,
        image: selAvatars[i].uri,
        traits: { ...selAvatars[i].traits },
      });
    }
    await collectionService.pinJSON({collection: collection, metadata: metadataArray, avatars: selAvatars});
    navigate(`/mint-to-collection?collection=${collection.id}`);
  }


  const handleChecked = (id) => {
    const index = selAvatars.findIndex(avatar => avatar.id === id);
    return index !== -1
  }

  // handle select avatar
  const handleSelectAvatar = (payload) => {
    let temp = [...selAvatars];
    const index = selAvatars.findIndex(avatar => avatar.id === payload.id);
    if (index === -1) {
      temp.push(payload)
    } else {
      temp.splice(index, 1);
    }
    setSelAvatars(temp);
  }

  const navigateToAvatar = () => {
    navigate("/create-avatar");
  };
  

  useEffect(() => {
    async function getAvatars() {
      const res = await avatarService.fetch();
      setAvatars(res);
    }
    getAvatars();
  }, []);

  return (
    <React.Fragment>
      <div className="mediaProfilepage-datacontent-profiledetail my-new-collection">
        <div className="mediaProfilepage-datacontent-new-collection">
          {
            !!collection && (
              <div className="mediaProfilepage-datacontent-new-collection-header">
                <div className="mediaProfilepage-datacontent-new-collection-header-profile">
                  <img src={`${baseUrl}/upload/${collection.image}`} alt="no img" />
                </div>
                <div className="mediaProfilepage-datacontent-new-collection-header-right">
                  <h1 className="mediaProfilepage-datacontent-new-collection-header-right-heading">
                    { collection.name }
                  </h1>
                  <ul className="mediaProfilepage-datacontent-new-collection-header-right-num-row">
                    <li className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li">
                      <span className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li-span">
                        0
                      </span>
                      <label className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li-label">
                        Items
                      </label>
                    </li>
                    <li className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li">
                      <span className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li-span">
                        1
                      </span>
                      <label className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li-label">
                        Owners
                      </label>
                    </li>
                    <li className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li">
                      <span className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li-span likes">
                        {" "}
                        <Heart /> 0{" "}
                      </span>
                      <label className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li-label">
                        Likes
                      </label>
                    </li>
                    <li className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li">
                      <span className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li-span">
                        { collection.type }
                      </span>
                      <label className="mediaProfilepage-datacontent-new-collection-header-right-num-row-li-label">
                        Token type
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            )
          }
          {
            !!collection && (
              <div className="mediaProfilepage-datacontent-new-collection-profile">
                <div className="mediaProfilepage-datacontent-new-collection-profile-img">
                  <img src={`${baseUrl}/upload/${collection.image}`} alt="no img" />
                </div>
                <span className="mediaProfilepage-datacontent-new-collection-profile-name">
                  {`${collection.name} #1`}
                </span>
              </div>
            )
          }
          <span className="mediaProfilepage-datacontent-new-collection-para">
            NFT Title is by far my most versatile algorithm to date. Although
            the program stays focused on structured curves and blocks, the
            varieties of scale, organization, texture, and color usage it can
            employ create a wide array of generative possibilities.
          </span>

          <div className="mediaProfilepage-datacontent-new-collection-avatars">
            <h1 className="mediaProfilepage-datacontent-new-collection-avatars-heading">
              My avatars
            </h1>
            <div className="mediaProfilepage-datacontent-new-collection-avatars-list">
              {/* avatars */}
              {
                avatars.map((avatar, i) => (
                  <div onMouseUp={() => handleSelectAvatar(avatar)} key={i} className="mediaProfilepage-datacontent-new-collection-avatars-list-single">
                    <label>
                      <div className="mediaProfilepage-datacontent-new-collection-avatars-list-single-select">
                        <input
                          type="checkbox"
                          name="my-avatar"
                          className="mediaProfilepage-datacontent-new-collection-avatars-list-single-select-input"
                          checked={handleChecked(avatar.id)}
                        />
                        <label className="mediaProfilepage-datacontent-new-collection-avatars-list-single-select-label"></label>
                      </div>
                      <div className="mediaProfilepage-datacontent-new-collection-avatars-list-single-img">
                        <img src={`${baseUrl}/upload/${avatar.filename}`} alt="no img" />
                      </div>
                    </label>
                  </div>
                ))
              }
              <div className="mediaProfilepage-datacontent-new-collection-avatars-list-single">
                <label htmlFor="avatar_8" onClick={navigateToAvatar}>
                  {/* <div className="mediaProfilepage-datacontent-new-collection-avatars-list-single-select">
                    <input type="checkbox" name="my-avatar"  className="mediaProfilepage-datacontent-new-collection-avatars-list-single-select-input"/>
                    <label className="mediaProfilepage-datacontent-new-collection-avatars-list-single-select-label"></label>
                  </div> */}
                  <div className="mediaProfilepage-datacontent-new-collection-avatars-list-single-add-avatar">
                    {" "}
                    <Addicon />{" "}
                  </div>
                  <span className="mediaProfilepage-datacontent-new-collection-avatars-list-single-label">
                    Create New
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="center">
            <button onClick={mintCollection} className="btn btn-info">
              Mint to Collection
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyNewCollection_Component;
