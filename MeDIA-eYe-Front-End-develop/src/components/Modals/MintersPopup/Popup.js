import React, { useState, useEffect } from 'react';

import CloseIcon from '../../Icons/CloseIcon';
import makeAnimated from 'react-select/animated';
import { useSelector, useDispatch } from 'react-redux';
import { closeMintersPopup } from '../../../store/app/appSlice';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import avatar from '../../../assets/img/avatar_collection.png';
import formatAdddress from '../../../utils/formatAdddress';
import PopupApprove from './ApproveMintersPopup/Popup';
import PopupRemove from './RemoveMintersPopup/Popup';
import { grantRole } from '../../../blockchain/functions/Collection/GrantRole';
import { queryCollection } from '../../../blockchain/functions/Collection';

const animatedComponents = makeAnimated();

let minters = [
  {
    id: 1,
    value: 'Username_1 0x461d36CD352a254C12263BC7b9400fE927F859cE',
    title: 'Username_1',
    wallet: '0x732b2e3caBEd09A39d8964D985bBF253Fe187E5F',
    label: (
      <span>
        <img src={avatar} alt="avatar" />
        &ensp; Username_1<button>Add</button>
      </span>
    ),
    img: avatar
  },
  {
    id: 2,
    value: ' Username_1 09gdtd36CD352a254C12263BC7b9400fE927F8ou90',
    title: 'Username_2',
    wallet: '09gdtd36CD352a254C12263BC7b9400fE927F8ou90',
    label: (
      <span>
        <img src={avatar} alt="avatar" />
        &ensp; Username_2
        <button>Add</button>
      </span>
    ),
    img: avatar
  },
  {
    id: 3,
    value: 'Username_3 0x461d36CD352a254C12263BC7b9400fE927F859cE',
    title: 'Username_3',
    wallet: '0x461d36CD352a254C12263BC7b9400fE927F859cE',
    label: (
      <span>
        <img src={avatar} alt="avatar" />
        &ensp; Username_3<button>Add</button>
      </span>
    ),
    img: avatar
  },
  {
    id: 4,
    value: 'Username_4 0x461d36CD352a254C12263BC7b9400fE927F859cE',
    title: 'Username_4',
    wallet: '0x732b2e3caBEd09A39d8964D985bBF253Fe187E5F',
    label: (
      <span>
        <img src={avatar} alt="avatar" />
        &ensp; Username_4<button>Add</button>
      </span>
    ),
    img: avatar
  }
];

const Popup = (props) => {
  const dispatch = useDispatch();
  const showPopup = useSelector((state) => state.app.showMintersPopup);
  const { Moralis, collection } = useSelector(
    (state) => state.app.mintersPopupContent
  );
  const [colState, setColState] = useState(collection);
  const [valueSelect] = useState(null);
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [activeMinters, setActiveMinters] = useState([]);
  const [minter, setMinter] = useState([{}]);
  const [owner, setOwner] = useState(null);
  let history = useHistory();
  // Search List
  const [searchedMinters, setSearchedMinters] = useState([]);

  useEffect(() => {
    if (collection) {
      setColState(collection);
    }
  }, [collection]);
  useEffect(() => {
    if (colState) {
      loadOwner();
      loadUsers();
    }
  }, [colState]);

  const displayMinters = () => {
    return activeMinters.map((minter) => {
      return (
        <div className="active_minters_block">
          <img
            src={
              minter?.attributes?.profileImage?._url
                ? minter?.attributes?.profileImage?._url
                : avatar
            }
            alt="avatar"
          />
          <h5 onClick={() => handleOwnerPressed()}>
            {minter?.attributes?.defaultUsername
              ? formatAdddress(minter?.attributes?.ethAddress)
              : minter?.attributes?.username}
          </h5>
        </div>
      );
    });
  };
  const loadUsers = async () => {
    let promises = [];
    for (let i = 0; i < colState.attributes.minters.length; i++) {
      promises.push(
        Moralis.Cloud.run('queryUser', {
          address: colState.attributes.minters[i]
        })
      );
    }
    const res = await Promise.all(promises);
    setActiveMinters(res);
  };

  const loadOwner = async () => {
    const result = await Moralis.Cloud.run('queryUser', {
      address: colState.attributes.owner
    });
    setOwner(result);
  };
  const toggleApprovePopup = () => {
    setShowApprovePopup(!showApprovePopup);
  };

  const toggleRemovePopup = () => {
    setShowRemovePopup(!showRemovePopup);
  };

  const openRemovePopup = (e) => {
    setShowRemovePopup(true);
    setMinter([e]);
  };

  const openApprovePopup = (e) => {
    if (e[0] === undefined) {
      return;
    }
    setShowApprovePopup(true);
    setMinter(e[0]);
  };

  // call grantRole function
  const handleGrantRole = async (minter) => {
    const res = await grantRole(
      Moralis,
      colState.attributes.collectionAddress,
      minter
    );
    if (res) {
      // refetch collection data
      const newCol = await queryCollection(
        Moralis,
        colState.attributes.collectionAddress
      );
      setColState(newCol);
      toggleApprovePopup();
    }
  };

  // pushs a minter to ui
  const handleChangMinters = (e) => {
    if (e[0] === undefined) {
      return;
    }
    let arr = activeMinters.slice();
    arr.push(e[0]);
    setActiveMinters(arr);
    minters.forEach(function (item, i) {
      if (item.id === e[0].id) {
        minters.splice(i, 1);
      }
    });
  };

  const removeMinter = (wallet) => {
    let arr = activeMinters.slice();
    arr.forEach(function (item, i) {
      if (item.wallet === wallet) {
        arr.splice(i, 1);
        minters.push(item);
      }
    });
    setActiveMinters(arr);
  };

  const handleOwnerPressed = () => {
    if (owner) {
      history.push(`/account/${owner?.attributes?.ethAddress}`);
      dispatch(closeMintersPopup());
    }
  };

  const handleSearchMinters = (e) => {
    if (e.length > 0) {
      searchMinters(e);
    } else {
      setSearchedMinters([]);
    }
  };

  const searchMinters = async (searchText) => {
    const searchParams = { searchText: searchText };
    // map each minter to a <Select/> label
    const result = await Moralis.Cloud.run('SearchUsers', searchParams);
    const newSearchedMinters = await result
      .filter((searchedUser) => {
        // filter out own user and any users already in the active minter list
        if (
          searchedUser.attributes.ethAddress === owner.attributes.ethAddress ||
          activeMinters.filter(
            (e) =>
              e.attributes.ethAddress === searchedUser.attributes.ethAddress
          ).length > 0
        ) {
          return false;
        }
        return true;
      })
      .map((searchedUser, i) => {
        return {
          id: i,
          address: searchedUser.attributes.ethAddress,
          value: searchedUser.attributes.defaultUsername
            ? 'Unnamed'
            : searchedUser.attributes.username,
          label: (
            <span>
              <img
                style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                src={
                  searchedUser.attributes.profileImage?._url
                    ? searchedUser.attributes.profileImage?._url
                    : avatar
                }
                alt="avatar"
              />
              &ensp;
              {searchedUser.attributes.defaultUsername
                ? searchedUser.attributes.ethAddress
                : searchedUser.attributes.username}
              <button onClick={(e) => openApprovePopup(e)}>Add</button>
            </span>
          ),
          img: searchedUser.attributes.profileImage?._url
            ? searchedUser.attributes.profileImage?._url
            : avatar
        };
      });

    setSearchedMinters(newSearchedMinters);
  };

  const allowMinters = (e) => {
    if (
      owner?.attributes?.subscriptionLevel > 1 &&
      owner?.attributes?.subscriptionEnd > Date.now() / 1000
    ) {
      handleChangMinters(e);
    } else {
      alert('Subscription Level too low to add minters');
    }
  };

  return (
    <React.Fragment>
      {showPopup ? (
        <div className={showPopup ? 'popup active' : 'popup'}>
          <PopupApprove
            showPopup={showApprovePopup}
            togglePopup={toggleApprovePopup}
            minter={minter}
            handleGrantRole={handleGrantRole}
          />
          <PopupRemove
            showPopup={showRemovePopup}
            togglePopup={toggleRemovePopup}
            minter={minter}
            removeMinter={removeMinter}
          />
          <div
            className={
              ' popup-wrapper popup-wrapper_general create_campaign'
            }
            onClick={() => dispatch(closeMintersPopup())}
          >
            <div
              className="container"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className={
                  ' main_add_popup general_popup create_campaign_block'
                }
              >
                <div
                  className="close"
                  onClick={() => dispatch(closeMintersPopup())}
                >
                  <CloseIcon />
                </div>
                <div
                  className={
                    ' add_block_colletion create_campaign_block'
                  }
                >
                  <h4>Number of Minters: {1 + activeMinters.length}</h4>
                  <div className={''}>
                    <div className="active_minters">
                      <div className="active_minters_block">
                        <img
                          src={owner?.attributes?.profileImage?._url}
                          alt="avatar"
                        />
                        <h5 onClick={() => handleOwnerPressed()}>
                          {owner?.attributes?.defaultUsername
                            ? owner?.attributes?.ethAddress
                            : owner?.attributes?.username}
                        </h5>
                        <span>Owner</span>
                      </div>

                      {
                        //activeMintersList
                        displayMinters()
                      }
                    </div>
                  </div>
                  <div>
                    <h6>Add Minter</h6>
                    <div className="collection_block_content_minters create_campaign_block_content_minters">
                      <Select
                        className="search_select"
                        components={animatedComponents}
                        options={searchedMinters}
                        filterOption={null}
                        placeholder="@username or address"
                        onChange={(e) => openApprovePopup(e)}
                        onInputChange={handleSearchMinters}
                        isMulti
                        value={valueSelect}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Popup;
