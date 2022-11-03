import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import CreateProductMintBlock from '../CreateProductMintBlock/CreateProductMintBlock';
import {
  closeGeneralPopup,
  toggleGeneralPopup
} from '../../../store/app/appSlice';
import Popup from '../MintPopup/Popup';
import { useMoralis } from 'react-moralis';
import {
  mint1155,
  mintMultiple,
  queryApproved
} from '../../../blockchain/functions/Content';
import { queryCollections } from '../../../blockchain/functions/Collection/QueryCollections';
import ChangeChainRequest from '../../../blockchain/functions/ChangeChain/ChangeChainRequest';
import { ChainName } from '../../../blockchain/functions/ChangeChain/ChainNames';
import { useDispatch } from 'react-redux';
import { uploadApproveFile } from '../../../blockchain/functions/Single/UploadApproveFile';
import Close from '../../Icons/Close';
import Switch from 'react-switch';
import { pinImageToIPFS } from '../../../blockchain/functions/Pinning/pinImageToIPFS';
import CollectionCard from '../../ContentMarketplace/CollectionCard/CollectionCard';
import { queryCollectionsByChain } from '../../../blockchain/functions/Collection';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import EditPopup from '../MintEditPopup/Popup';
import { pinMetadataToIPFS } from '../../../blockchain/functions/Pinning/pinMetadataToIPFS';
import {
  queryFileType,
  GetTokenIcon,
  GetNetworkIcon,
  fileUploaderLayout
} from '../../../blockchain/functions/Utils';
import { Model3d } from '../../3d/Model3d';
import { ObjViewer } from 'react-obj-viewer';
import {
  InfoCircle,
  Edit,
  UploadIcon,
  Unlock,
  Plus,
  PlusSquare2
} from '../../Icons/';
import MintAddon from '../Addons/MintAddon';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { ChainScanerLink } from '../../../blockchain/functions/ChangeChain/ChainNames';
import { FileUploader } from 'react-drag-drop-files';
import './Mint.scss';
import { allowOnlyNumber } from '../../../blockchain/functions/Utils';

var validate = require('validate.js');
const Mint = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { Moralis, user, isInitialized } = useMoralis();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );
  const [activeToken, setActiveToken] = useState('ERC721');
  const [activeImages, setActiveImages] = useState([]);
  const [approvedList, setApprovedList] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [collectionSelectable, setSelectable] = useState(true);
  const [collection, setCollection] = useState('none');
  const [currentCollection, setCurrentCollection] = useState(null);
  const [selected, setSelected] = useState(-1);
  const [collections, setCollections] = useState([]);
  const [selectedChain, setSelectedChain] = useState(null);
  const [editContent, setEditContent] = useState(null);
  const [editContentActiveNumber, setEditContentActiveNumber] = useState(null);

  const [isLoading, setLoading] = useState(false);
  // Approve file upload fields
  const [file, setFile] = useState(null);
  const [filesType, setFilesType] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [supply, setSupply] = useState(1);
  const [contentList, setContentList] = useState([]);
  const [unlockableContentList, setUnlockableContentList] = useState([]);
  const [toggleCollections, setToggleCollections] = useState(true);
  const [toggleUnlocable, setToggleUnlocable] = useState(false);

  const [unlockableContent, setUnlockableContent] = useState('');
  const [properties, setProperties] = useState([]);
  const [levels, setLevels] = useState([]);
  const [stats, setStats] = useState([]);
  const allowFileTypes = [
    'JPEG',
    'JPG',
    'PNG',
    'SVG',
    'MP4',
    'GLB',
    'GLTF',
    'OBJ'
  ];
  const [allowMaxSize, setAllowMaxSize] = useState(0);
  const [uploadinatilation, setUploadinatilation] = useState(true);
  const createMintForm = useRef();

  useEffect(() => {
    if (user?.attributes?.subscriptionLevel === 2) {
      setAllowMaxSize(250);
    } else if (user?.attributes?.subscriptionLevel === 1) {
      setAllowMaxSize(100);
    } else {
      setAllowMaxSize(50);
    }
  }, [user]);
  const switchCollection = () => {
    if (toggleCollections) {
      setToggleCollections(false);
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleCollections(true);
    }
    setCurrentCollection('');
  };

  const switchUnlocable = () => {
    if (toggleUnlocable) {
      setToggleUnlocable(false);
      setUnlockableContent('');
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleUnlocable(true);
    }
  };

  const handleFileTypeError = (error) => {
    setFile(null);
    dispatch(
      toggleGeneralPopup({
        status: 'error',
        message: `Must be of type .png, .jpg, .jpeg, .gif, .svg, .mp4, .gltf, .glb, .obj`,
        textButton: 'OK'
      })
    );
  };
  const handleFileSizeError = (error) => {
    setFile(null);
    dispatch(
      toggleGeneralPopup({
        status: 'error',
        message: 'Please check the file size and try again',
        textButton: 'OK'
      })
    );
  };
  const handleFileSelected = (file) => {
    setFile(null);
    if (!file || file?.length === 0) {
      return;
    }
    let files = file;
    // exit if file is not of specified image type:
    if (
      !(
        files?.type === 'image/png' ||
        files?.type === 'image/jpeg' ||
        files?.type === 'image/jpg' ||
        files?.type === 'image/gif' ||
        files?.type === 'image/svg+xml' ||
        files?.type === 'video/mp4' ||
        files?.type === 'model/obj' ||
        files?.name.split('.').pop() === 'gltf' ||
        files?.name.split('.').pop() === 'glb' ||
        files?.name.split('.').pop() === 'obj'
      )
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: `Must be of type .png, .jpg, .jpeg, .gif, .svg, .mp4, .gltf, .glb, .obj`,
          textButton: 'OK'
        })
      );
      return;
    }

    if (
      user.attributes.subscriptionLevel === 2 &&
      user.attributes.subscriptionEnd > Date.now() / 1000
    ) {
      if (files.size > 1000000 * allowMaxSize) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: `File must be smaller than 250mb for Level 2 subscription`,
            textButton: 'OK'
          })
        );
        return;
      }
    } else if (
      user.attributes.subscriptionLevel === 1 &&
      user.attributes.subscriptionEnd > Date.now() / 1000
    ) {
      if (files.size > 1000000 * allowMaxSize) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: `File must be smaller than 100mb for Level 1 subscription`,
            textButton: 'OK'
          })
        );
        return;
      }
    }
    if (user.attributes.subscriptionLevel === 0) {
      if (files.size > 1000000 * allowMaxSize) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: `File must be smaller than 50 MB for free subscription`,
            textButton: 'OK'
          })
        );
        return;
      }
    }

    if (user.attributes.subscriptionEnd <= Date.now() / 1000) {
      if (files.size > 1000000 * allowMaxSize) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: `Your subscription has expired. File must be smaller than 50 MB for free subscription`,
            textButton: 'OK'
          })
        );
        return;
      }
    }
    // create url to load image
    setFilesType(
      files?.type === 'image/png' ||
        files?.type === 'image/jpeg' ||
        files?.type === 'image/jpg' ||
        files?.type === 'image/gif' ||
        files?.type === 'image/svg+xml'
        ? 'image/' + files?.name.split('.').pop()
        : files?.type === 'video/mp4'
        ? 'video/mp4'
        : files?.name.split('.').pop()
    );
    const url = URL.createObjectURL(files);
    files.url = url;

    // set current file
    setFile(files);
  };

  const changeUnlockableContent = (e) => {
    setUnlockableContent(e.target.value);
  };

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeSupply = (value, toggle) => {
    if (value < 1) {
      setSupply(' ');
    } else {
      setSupply(value);
    }
  };

  var constraints = {
    file: {
      presence: true
    },
    name: {
      presence: true
    },
    supply: {
      presence: activeToken === 'ERC1155' ? true : false
    }
  };

  const [createMintErrors, setCreateMintErrors] = useState([]);

  const handleUpload = async () => {
    scrollToRef(createMintForm);
    var form = document.querySelector('#mediaeye-create-mint-form');
    var errors = validate(form, constraints);
    setCreateMintErrors(errors);
    if (errors == undefined) {
      try {
        if (!file) {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: `Required fields name or file missing`,
              textButton: 'OK'
            })
          );
        }
        if (
          name === '' ||
          !file ||
          (supply === '' && activeToken === 'ERC1155') ||
          (toggleUnlocable && unlockableContent === '')
        ) {
          return;
        } else {
          if (propertiesIsDuplicate(properties)) {
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: `Property values should not be equal!`,
                textButton: 'OK'
              })
            );
            return false;
          }

          let newContentList = [...contentList];
          let newUnlockableContentList = [...unlockableContentList];

          // TODO: parse properties for null values and prune before minting
          const newContent = {
            amount: activeToken === 'ERC1155' ? supply : 1,
            collection: toggleCollections ? currentCollection : '',
            description,
            file,
            name,
            properties,
            levels,
            stats,
            toggleUnlocable,
            unlockableContent,
            filesType
          };

          newContentList.push(newContent);
          setContentList(newContentList);
          setDescription('');
          setFile(null);
          setName('');
          setFilesType(null);
          setSupply(1);
          setProperties([]);
          setLevels([]);
          setStats([]);
          setUnlockableContent('');
          setToggleUnlocable('');
          setUploadinatilation(false);
          setTimeout(function () {
            setUploadinatilation(true);
          }, 1000);

          setUnlockableContentList(newUnlockableContentList);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const propertiesIsDuplicate = (data) => {
    let duplicates = [];
    data.forEach((el, i) => {
      data.forEach((element, index) => {
        if (i === index) return null;
        if (
          element.trait_type === el.trait_type &&
          element.value === el.value
        ) {
          if (!duplicates.includes(el)) {
            duplicates.push(el);
          }
        }
      });
    });
    return duplicates?.length > 0 ? true : false;
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(
        toggleGeneralPopup({
          status: 'loading',
          message: 'Processing...',
          size: 'xs',
          autoClose: 'false'
        })
      );
    }
  }, [isLoading]);

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
  }, [user]);

  useEffect(() => {
    if (isLogin === 'false') {
      history.replace('/connect-wallet');
    }
  }, []);

  useEffect(() => {
    if (collectionSelectable) {
      setSelectedChain(activeNetwork);
    }
    if (user) {
      // show user's collections from query
      queryCollectionList();
    }
  }, [activeNetwork, user]);

  const handleClickInput = (e) => {
    inputElement.current.click();
  };
  let inputElement = useRef(null);

  const togglePopup = () => {
    // check if chain is correct and ask to switch if chain is wrong
    if (activeNetwork === selectedChain) {
      setShowPopup(!showPopup);
    } else {
      ChangeChainRequest(selectedChain);
    }
  };
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const scrollTop = useRef(null);

  const scrollToTop = () => {
    scrollToRef(scrollTop);
  };

  const removeContent = (i) => {
    let newContentList = [...contentList];
    newContentList.splice(i, 1);
    setContentList(newContentList);

    let newUnlockableContentList = [...unlockableContentList];
    newUnlockableContentList.splice(i, 1);
    setUnlockableContentList(newUnlockableContentList);
  };

  const addImage = (e, amount) => {
    let id = e.target.value;
    let activeImage;
    let arr = activeImages.slice();
    let newContentList = [...approvedList];

    if (activeToken === 'ERC721') {
      if (e.target.checked) {
        activeImage = approvedList.find((val) => val.id === id);
        // set all content to unselected since only a single one can be selected
        newContentList.map((content) => {
          if (content.id === activeImage.id) {
            content.isSelected = true;
          } else {
            content.isSelected = false;
          }
        });

        setActiveImages([activeImage]);
      } else {
        activeImage = approvedList.find((val) => val.id === id);
        // deselect the selected content
        newContentList.map((content) => {
          if (content.id === activeImage.id) {
            content.isSelected = false;
          }
        });
        setActiveImages([]);
      }
    } else {
      if (e.target.checked) {
        activeImage = approvedList.find((val) => val.id === id);
        activeImage.amount = amount;
        newContentList.map((content) => {
          if (content.id === activeImage.id) {
            content.isSelected = true;
          }
        });
        arr.push(activeImage);
        setActiveImages(arr);
      } else {
        activeImage = approvedList.find((val) => val.id === id);
        // deselect the selected content
        newContentList.map((content) => {
          if (content.id === activeImage.id) {
            content.isSelected = false;
          }
        });
        let filterArr = arr.filter((val) => val.id != id);
        setActiveImages(filterArr);
      }
    }
  };

  const setApproved = async () => {
    if (user) {
      const result = await queryApproved(Moralis, user.attributes.ethAddress);
      result.map((content) => {
        return (content.isSelected = false);
      });
      setApprovedList(result);
    }
  };

  const handleActiveToken = async (type) => {
    // deselect all when changing tokens
    let newContentList = [...approvedList];
    newContentList.map((content) => {
      content.isSelected = false;
    });

    setActiveImages([]);
    setContentList([]);
    setUnlockableContentList([]);
    setActiveToken(type);
  };

  const queryCollectionList = async () => {
    if (user) {
      const params = {
        chain: ChainHexString(activeNetwork),
        userAddress: user.attributes.ethAddress
      };
      const result = await queryCollectionsByChain(Moralis, params);
      setCollections(result);
      if (result.length > 0) {
        // set initial collection
        const initIndex = -1;
        if (initIndex > -1) {
          handleActiveToken(result[initIndex].attributes.collectionType);
          setSelected(initIndex);
          setSelectable(false);
          setCollection(result[initIndex].attributes.collectionAddress);
          setCurrentCollection(result[initIndex]);
        }
      }
    }
  };

  const collectionSelected = (index) => {
    if (index === -1) {
      // if -1 then none/main collection is selected, allow ability to switch activeToken
      setSelected(-1);
      setSelectable(true);
      setSelectedChain(activeNetwork);
    } else {
      const selectedCollection = collections[index];
      setSelected(index);
      setSelectable(false);
      handleActiveToken(selectedCollection.attributes.collectionType);
      setCollection(selectedCollection.attributes.collectionAddress);
      setCurrentCollection(selectedCollection);
      setSelectedChain(ChainName(selectedCollection.attributes.chainId));
    }
  };

  // TODO: encompass single ERC1155 mint in multiple NFT logic, remove single nft logic
  const handleMint = async () => {
    setLoading(true);
    if (activeNetwork !== selectedChain) {
      setLoading(false);
      dispatch(closeGeneralPopup());
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: `Please switch to ${selectedChain} network`,
          textButton: 'OK'
        })
      );
      return;
    }

    // upload files to ipfs
    for (let i = 0; i < contentList.length; i++) {
      // TODO: move this to a cloud operation for large files
      // save image to pinata
      const pinataImageHash = await pinImageToIPFS(contentList[i].file);
      contentList[i].ipfs = pinataImageHash;
      contentList[i].fileType = contentList[i].file.type;
      // create metadata, pin metadata to ipfs
      const attributes = contentList[i].properties.concat(
        contentList[i].levels,
        contentList[i].stats
      );
      const metadata = {
        name: contentList[i].name,
        description: contentList[i].description,
        image: `https://meye.mypinata.cloud/ipfs/${pinataImageHash}`,
        attributes
      };
      // if file type is mp4 include animation_url
      if (contentList[i].fileType === 'video/mp4') {
        metadata.animation_url = `https://meye.mypinata.cloud/ipfs/${pinataImageHash}`;
      }

      const pinataJsonHash = await pinMetadataToIPFS(metadata);
      contentList[i].metadata = pinataJsonHash;
    }
    if (contentList.length === 1 && activeToken === 'ERC1155') {
      // mint token to contract
      const transactionStatus = await mint1155(
        Moralis,
        activeToken,
        contentList[0],
        unlockableContentList[0],
        user.attributes.ethAddress,
        collection
      );
      setLoading(false);
      dispatch(closeGeneralPopup());
      if (transactionStatus.status) {
        history.replace(`/account/${user.attributes.ethAddress}`);
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Transaction Successful',
            message:
              'Please allow several minutes to display minted NFT in your account.',
            size: 'sm',
            copyText: transactionStatus?.transactionHash,
            copyTextLink:
              ChainScanerLink(activeNetwork) +
              '/tx/' +
              transactionStatus?.transactionHash,
            textButton: 'OK',
            autoClose: 'false'
          })
        );
        if (showPopup) {
          setShowPopup(false);
        }
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            title: 'Transaction Failed',
            message: transactionStatus?.data?.message
              ? transactionStatus.data.message
              : transactionStatus.message
              ? transactionStatus.message
              : 'Something went wrong. Try again',
            size: 'sm',
            textButton: 'OK'
          })
        );
      }
    } else {
      const amounts = [];

      let pinPromises = [];
      contentList.map((content) => {
        amounts.push(activeToken === 'ERC721' ? 1 : content.amount);
        // map all promises to use promise.all and pin all images at once
        pinPromises.push(pinImageToIPFS(content.file));
      });

      const imageHashs = await Promise.all(pinPromises);
      // build metadata using image hashs
      let metadataPromises = [];
      for (let i = 0; i < contentList.length; i++) {
        const attributes = contentList[i].properties.concat(
          contentList[i].levels,
          contentList[i].stats
        );
        const metadata = {
          name: contentList[i].name,
          description: contentList[i].description,
          image: `https://meye.mypinata.cloud/ipfs/${imageHashs[i]}`,
          attributes
        };

        // if file type is mp4 include animation_url
        if (contentList[i].fileType === 'video/mp4') {
          metadata.animation_url = `https://meye.mypinata.cloud/ipfs/${imageHashs[i]}`;
        }

        // add to content list
        contentList[i].metadata = metadata;
        // add to pin promise list
        metadataPromises.push(pinMetadataToIPFS(metadata));
      }
      // pin all metadatas
      const metadataHashs = await Promise.all(metadataPromises);

      const transactionStatus = await mintMultiple(
        Moralis,
        activeToken,
        contentList,
        unlockableContentList,
        metadataHashs,
        user.attributes.ethAddress,
        amounts,
        collection
      );
      setLoading(false);
      dispatch(closeGeneralPopup());
      if (transactionStatus.status) {
        history.replace(`/account/${user.attributes.ethAddress}`);
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Transaction Successful',
            message:
              'Please allow several minutes to display minted NFT in your account.',
            size: 'sm',
            copyText: transactionStatus?.transactionHash,
            copyTextLink:
              ChainScanerLink(activeNetwork) +
              '/tx/' +
              transactionStatus?.transactionHash,
            textButton: 'OK',
            autoClose: 'false'
          })
        );
        if (showPopup) {
          setShowPopup(false);
        }
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: transactionStatus?.data?.message
              ? transactionStatus.data.message
              : transactionStatus.message
              ? transactionStatus.message
              : 'Something went wrong. Try again',
            size: 'sm',
            textButton: 'OK'
          })
        );
      }
    }
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
    setApproved();

    // show user's collections from query
    queryCollectionList();
  }, [user]);

  useEffect(() => {
    if (isLogin === 'false') {
      history.replace('/connect-wallet');
    }
  }, []);

  const settings = {
    slidesPerView: 1,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.mediaeye-mint-add-collection-pagination',
      enable: true,
      clickable: true
    },
    breakpoints: {
      889: {
        slidesPerView: 1
      },
      1181: {
        slidesPerView: 2
      },
      1280: {
        slidesPerView: 3
      }
    }
  };

  const toggleEditPopup = (i) => {
    setEditContent(contentList[i]);
    setEditContentActiveNumber(i);
    setShowEditPopup(true);
  };

  const changeContent = (i, content) => {
    let arr = contentList.slice();
    if (propertiesIsDuplicate(content?.properties)) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: `Property values should not be equal!`,
          textButton: 'OK'
        })
      );
      return false;
    }
    arr[i] = content;
    setContentList(arr);
    setShowEditPopup(false);
    setEditContent(null);
  };
  const changeAddons = (content) => {
    setProperties(content?.properties ? content.properties : []);
    setLevels(content?.levels ? content.levels : []);
    setStats(content?.stats ? content.stats : []);
  };

  const mediaeyenetworks = () => {
    return (
      <>
        <div
          className={`mediaeyetoken-box ${
            activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME
              ? 'active'
              : ''
          }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              if (activeNetwork != process.env.REACT_APP_BSC_CHAIN_NAME) {
                await ChangeChainRequest(process.env.REACT_APP_BSC_CHAIN_NAME);
              }
            }}
          >
            <div className="mediaeyetoken-box-circle"></div>
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('BNB')} alt="BNB" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">BSC</div>
            </div>
          </div>
        </div>

        <div
          className={`mediaeyetoken-box ${
            activeNetwork === 'ETH' ? 'active' : ''
          }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              if (activeNetwork != 'ETH') {
                await ChangeChainRequest('ETH');
              }
            }}
          >
            <div className="mediaeyetoken-box-circle"></div>
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('ETH')} alt="ETH" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">ETH</div>
            </div>
          </div>
        </div>

        <div
          className={`mediaeyetoken-box ${
            activeNetwork === 'FTM' ? 'active' : ''
          }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              if (activeNetwork != 'FTM') {
                await ChangeChainRequest('FTM');
              }
            }}
          >
            <div className="mediaeyetoken-box-circle"></div>
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('FTM')} alt="FTM" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">FTM</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const mediaeyetokens = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${
            activeToken === 'ERC721' ? 'active' : ''
          }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              if (contentList.length === 0) setActiveToken('ERC721');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name mediaeyeinfo">
                ERC-721
                <span
                  className="mediaeyeinfo-sign"
                  data-class="mediaeyetooltip"
                  data-tip="ERC-721 is a global Token standard exhibiting functionalities of developing the Non-Fungible Tokens over the Ethereum blockchain. The ERC-721 contributes to the rarity and uniqueness to the assets designed and developed. The NFTs are developed with unique uint256 token ID attributes that are available globally."
                >
                  {' '}
                  <InfoCircle type="outline" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${
            activeToken === 'ERC1155' ? 'active' : ''
          }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              if (contentList.length === 0) setActiveToken('ERC1155');
            }}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name mediaeyeinfo">
                ERC-1155{' '}
                <span
                  className="mediaeyeinfo-sign"
                  data-class="mediaeyetooltip"
                  data-tip="ERC-1155 is a token standard specifically designed and developed by the Enjin network. ERC-1155 can be used to create both fungible (currencies) and non-fungible (digital cards, pets and in-game skins) assets exclusively on the Ethereum Blockchain Network Architecture along with Transaction bundling which reduces the cost of token development."
                >
                  <InfoCircle type="outline" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/create/mint'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NFT Creation Services for Inviduals, Groups and Businesses | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Easy to use NFT creator services including royalties and charities. Rapid creation and deployment made easy."
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/MINT_nfts.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/create/mint" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/create/mint'}
        />
        <meta
          name="twitter:title"
          content="NFT Creation Services for Inviduals, Groups and Businesses | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Easy to use NFT creator services including royalties and charities. Rapid creation and deployment made easy."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/MINT_nfts.png'}
        />
        <title>
          NFT Creation Services for Inviduals, Groups and Businesses | MEDIA EYE
        </title>
        <meta
          name="description"
          content="Easy to use NFT creator services including royalties and charities. Rapid creation and deployment made easy."
        />
      </Helmet>

      <Popup
        showPopup={showPopup}
        togglePopup={togglePopup}
        activeToken={activeToken}
        activeBlockchain={selectedChain}
        contentList={contentList}
        Moralis={Moralis}
        handleMint={handleMint}
        isLoading={isLoading}
      />
      <EditPopup
        showPopup={showEditPopup}
        editContent={editContent}
        activeToken={activeToken}
        changeContent={changeContent}
        editContentActiveNumber={editContentActiveNumber}
        togglePopup={() => {
          setShowEditPopup(!showEditPopup);
          setEditContent(null);
        }}
      />

      <div
        className="create-mint-page"
        ref={scrollTop}
        id="mediaeye-create-mint-form"
      >
        <div className="mediaeye-layout-middle">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-container-header">
              <div className="mediaeye-layout-container-header-heading">
                <h2>Mint NFT</h2>
                <a
                  className="mediaeye-layout-container-header-heading-link"
                  href="/"
                  target="_blank"
                >
                  &#9654; Tutorial
                </a>
              </div>
            </div>

            <div className="create-mint-page-main-content-row create-mint-page-main-content-row-networks">
              <div className="create-mint-page-main-content-row-card">
                <div className="create-mint-page-main-content-row-card-header">
                  <div className="create-mint-page-main-content-row-card-header-heading">
                    Blockchain Network And Token Type
                  </div>
                </div>
                <div className="create-mint-page-main-content-row-card-body">
                  <div className="mediaeyetoken" size={3}>
                    {mediaeyenetworks()}
                  </div>

                  <div
                    className="mediaeyetokentype create-mint-page-main-content-row-token"
                    size={3}
                  >
                    {mediaeyetokens()}
                  </div>
                </div>
              </div>
            </div>

            <div className="create-mint-page-main">
              <div className="create-mint-page-main-collection">
                <div className={toggleCollections ? 'cheked_block' : ''}>
                  <div className="create-mint-page-main-collection-section">
                    <div className="create-mint-page-main-collection-section-first">
                      <div className="create-mint-page-main-collection-section-first-header">
                        <label htmlFor="collectionToggle">
                          Add to Collection
                        </label>
                        <div
                          className="mediaeyeinfo mediaeyeswitch"
                          data-html={true}
                          data-class="mediaeyetooltip"
                          data-tip="Minting to a collection will allow you to quickly select a Collection of the same token type and Mint to that Collection."
                        >
                          <InfoCircle type="outline-white" />
                        </div>
                        <Switch
                          id="collectionToggle"
                          checkedIcon={false}
                          uncheckedIcon={false}
                          onChange={() => {
                            switchCollection();
                          }}
                          checked={toggleCollections}
                          height={21}
                          width={50}
                          className={`mediaeyeswitch-btn mediaeyeswitch-left ${
                            toggleCollections ? 'active' : ''
                          }`}
                        />
                      </div>
                      <div className="create-mint-page-main-collection-section-first-header-info">
                        You can select one collection to mint NFT
                      </div>
                    </div>
                    {!toggleCollections &&
                    user?.attributes?.subscriptionLevel < 1 ? (
                      <div>
                        <button
                          type="button"
                          className="btn btn-main"
                          onClick={() => history.push('/profile/subscription')}
                        >
                          Subscribe
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
                {toggleCollections ? (
                  <>
                    <Swiper
                      {...settings}
                      className="mediaeye-collection-slide m-t-30"
                    >
                      {collections.map((collection, i) =>
                        collection?.attributes?.collectionType ===
                        activeToken ? (
                          <SwiperSlide key={i}>
                            <CollectionCard
                              key={i}
                              collection={collection}
                              onClickAction={(e) => {
                                e.preventDefault();
                                collectionSelected(i);
                              }}
                              active={i === selected ? true : false}
                            />
                          </SwiperSlide>
                        ) : null
                      )}
                      <SwiperSlide>
                        <div className="mediaeye-collection-card">
                          <Link
                            to="/create/collection"
                            className="mediaeye-collection-card-inner mediaeye-collection-card-inner-add"
                          >
                            <div className="mediaeye-collection-card-inner-add-content">
                              <div className="mediaeye-collection-card-inner-add-content-icon">
                                <Plus />
                              </div>
                              <div className="mediaeye-collection-card-inner-add-content-text">
                                New Collection
                              </div>
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                    <div className="mediaeye-swiper-pagination mediaeye-mint-add-collection-pagination mediaeye-swiper-pagination-center withscroll m-t-30"></div>
                  </>
                ) : null}

                <div
                  className="create-mint-page-main-collection-content"
                  ref={createMintForm}
                >
                  <div className="create-mint-page-main-collection-content-info">
                    <div className="create-mint-page-main-collection-content-info-head">
                      <span>
                        Upload and Save your Content to Mint Single or Multiple
                        NFTs
                      </span>
                    </div>
                    <div className="create-mint-page-main-collection-content-info-type">
                      <span>Image, Video, Audio, or 3D Model</span>
                    </div>
                  </div>
                  <div className="create-mint-page-main-collection-content-data">
                    {uploadinatilation ? (
                      <>
                        <input type="hidden" name="file" value={file?.url} />
                        <FileUploader
                          onSizeError={handleFileSizeError}
                          onTypeError={handleFileTypeError}
                          handleChange={
                            contentList.length < 20 ? handleFileSelected : null
                          }
                          classes="mediaeyefileUploader"
                          children={fileUploaderLayout({
                            allowType: allowFileTypes,
                            maxSize: allowMaxSize,
                            file: file
                          })}
                          types={allowFileTypes}
                        />
                      </>
                    ) : null}
                    {createMintErrors?.file && (
                      <div className="mediaeyeform-group-input-error-message">
                        {createMintErrors?.file}
                      </div>
                    )}

                    <div className="create-mint-page-main-collection-content-data-right">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="name">
                          Name*
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            id="name"
                            value={name}
                            onChange={
                              contentList.length < 20
                                ? (e) => changeName(e)
                                : null
                            }
                            className={
                              createMintErrors?.name
                                ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                : 'mediaeyeform-input'
                            }
                            name="name"
                          />
                        </div>
                        {createMintErrors?.name ? (
                          <div className="mediaeyeform-group-input-error-message">
                            {createMintErrors?.name}
                          </div>
                        ) : null}
                      </div>
                      {activeToken === 'ERC1155' ? (
                        <div className="mediaeyeform-group">
                          <label
                            className="mediaeyeform-label"
                            htmlFor="supply"
                          >
                            Supply
                          </label>
                          <div className="mediaeyeform-group-input">
                            <input
                              id="supply"
                              value={supply}
                              type="text"
                              name="supply"
                              onChange={
                                contentList.length < 20
                                  ? (e) =>
                                      changeSupply(
                                        allowOnlyNumber(e.target.value, false)
                                      )
                                  : null
                              }
                              className={
                                createMintErrors?.supply
                                  ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                  : 'mediaeyeform-input'
                              }
                            />
                          </div>
                          {createMintErrors?.supply ? (
                            <div className="mediaeyeform-group-input-error-message">
                              {createMintErrors?.supply}
                            </div>
                          ) : null}
                        </div>
                      ) : null}

                      <div className="mediaeyeform-group">
                        <label
                          className="mediaeyeform-label"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <div className="mediaeyeform-group-input">
                          <div className="mediaeyetextarea">
                            <textarea
                              id="description"
                              value={description}
                              className="mediaeyetextarea-input"
                              rows="5"
                              onMouseDown={() => {}}
                              onMouseUp={() => {}}
                              onChange={
                                contentList.length < 20
                                  ? (e) => changeDescription(e)
                                  : null
                              }
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="create-mint-page-main-collection-content-data-mint">
                    <div className="create-mint-page-main-collection-content-data-mint-header">
                      <span>How To Setup NFT Properties</span>
                      <div
                        className="mediaeyeinfo"
                        data-html={true}
                        data-class="mediaeyetooltip"
                        data-tip="<strong>Properties</strong><br/>Text features used sequentially to describe elements or parts of the object or character in the NFTs image (background, head, body, clothing, eyes, etc.).<br/><br/><strong>Levels</strong><br/>Numerical traits used in NFT collections usually represent the strength or impact of a certain trait which can be expressed as a range of values displayed as progress bars (stamina, power, energy, and so on).<br/><br/><strong>Stats</strong><br/>Numerical traits used in NFT collections usually represent the strength, impact, or rank of a given trait which would be rank personage displayed as a numeric value (the number of versions, strength, rank, and so on)."
                      >
                        <InfoCircle type="outline-white" />
                      </div>
                    </div>
                    <MintAddon
                      addonsdata={{
                        properties: properties,
                        levels: levels,
                        stats: stats
                      }}
                      changeAddons={changeAddons}
                    />
                  </div>

                  <div className={toggleUnlocable ? 'cheked_block' : ''}>
                    <div className="create-mint-page-main-collection-content-data-unlocable mediaeyeswitch">
                      <div className="create-mint-page-main-collection-content-data-unlocable-head">
                        <Unlock />
                        <label htmlFor="unlockableContent">
                          Unlockable Content
                        </label>
                      </div>
                      <div
                        className="mediaeyeinfo"
                        data-html={true}
                        data-class="mediaeyetooltip"
                        data-tip="Include unlockable content that can only be revealed by the owner of the item."
                      >
                        <InfoCircle type="outline-white" />
                      </div>
                      <Switch
                        id="unlockableContent"
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          switchUnlocable();
                        }}
                        checked={toggleUnlocable}
                        height={21}
                        width={50}
                        className={`mediaeyeswitch-btn mediaeyeswitch-left ${
                          toggleUnlocable ? 'active' : ''
                        }`}
                      />
                    </div>
                  </div>
                  {toggleUnlocable ? (
                    <div className="mediaeyeform-group">
                      <div className="mediaeyetextarea">
                        <textarea
                          value={unlockableContent}
                          className="mediaeyetextarea-input"
                          rows="5"
                          placeholder="Enter Content"
                          onChange={(e) => changeUnlockableContent(e)}
                        ></textarea>
                      </div>
                    </div>
                  ) : null}

                  <div className="create-mint-page-main-collection-content-data-savebtn">
                    <button
                      // disabled={!file ? true : false}
                      className="btn btn-info"
                      onClick={handleUpload}
                    >
                      <span>Save</span>
                    </button>
                    <div
                      className="mediaeyeinfo"
                      data-html={true}
                      data-class="mediaeyetooltip"
                      data-tip="Save your content in order to  edit and create a new one."
                    >
                      <InfoCircle type="outline-white" />
                    </div>
                  </div>
                </div>
                {contentList.length > 0 ? (
                  <div className="create-mint-page-main-collection-bottomtitle">
                    <span>
                      You can mint up to 20 NFTs per transaction to save on gas
                      fees.
                    </span>
                  </div>
                ) : null}
                <div className="create-mint-page-main-collection-bottom">
                  {contentList.map((content, i) => {
                    return (
                      <CreateProductMintBlock
                        activeToken={activeToken}
                        content={content}
                        key={i}
                        index={i}
                        addImage={addImage}
                        /* addAmount={addAmount} */
                        removeContent={removeContent}
                        onClickEdit={() => toggleEditPopup(i)}
                      />
                    );
                  })}

                  {contentList.length > 0 ? (
                    <div
                      className="mediaeye-collection-card"
                      onClick={contentList.length < 20 ? scrollToTop : null}
                    >
                      <Link className="mediaeye-collection-card-inner mediaeye-collection-card-inner-add">
                        <div className="mediaeye-collection-card-inner-add-content">
                          <div className="mediaeye-collection-card-inner-add-content-icon">
                            {contentList.length < 20 ? (
                              <PlusSquare2 />
                            ) : (
                              <div className="info-icon">
                                <InfoCircle type="outline-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                      <div className="mediaeye-collection-card-description">
                        {contentList.length < 20
                          ? 'Mint New NFT'
                          : 'You have reached the creation limit'}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="create-mint-page-main-mintbtn">
                  <button
                    className="btn btn-creative"
                    onClick={() => togglePopup()}
                    disabled={
                      !activeToken || !activeNetwork || contentList.length === 0
                        ? 'disabled'
                        : null
                    }
                  >
                    Mint
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mint;
