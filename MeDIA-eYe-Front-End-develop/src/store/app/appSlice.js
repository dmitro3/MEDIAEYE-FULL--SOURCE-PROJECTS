import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeNetwork: null,
  darkTheme: localStorage.getItem('darkTheme')
    ? JSON.parse(localStorage.getItem('darkTheme'))
    : true,
  isLogin: localStorage.getItem('isLogin')
    ? JSON.parse(localStorage.getItem('isLogin'))
    : true,
  timerPopup: false,
  scrollPage: true,
  registerPopup: false,
  activeTab: 'owner',
  showGeneralPopup: false,
  showEventRegisterPopup: false,
  showCharityPlacePopup: false,
  showPartnersPopup: false,
  showMintersPopup: false,
  setTypeofPopup: '',
  getActiveTokenId: null,
  getActiveNetwork: null,
  showEventsPopup: false,
  showImagePopupCropp: false,
  ImagePopupCroppFile: null,
  imagePopupCroppCoordinate: null,
  imagePopupCroppAspect: null,
  closeGeneralPopup: false,
  messageGeneralPopup: '',
  submessageGeneralPopup: '',
  textButtonGeneralPopup: '',
  linkButtonGeneralPopup: '',
  copyTextGeneralPopup: '',
  copyTextLinkGeneralPopup: '',
  titleGeneralPopup: '',
  autoCloseGeneralPopup: 'true',
  sizeGeneralPopup: 'sm',
  statusGeneralPopup: null,
  initialSlideNotification: null,
  listNotifications: [],
  showAboutBuyPopup: false,
  showPurchaseComplete: false,
  showGenerativeImagePreview: false,
  showGenerativeUploadPopup: false,
  genrativeUploadValue: '',
  showCharityDonatePopup: false,
  getCharityDonationIframe: '',
  getCharityDonationScript: '',
  showEyeDropdown: false,
  showImagePreviewPopup: false,
  showBurnPopup: false,
  showSocialPopup: false,
  burnPopupContent: [],
  currentNFT: {},
  showFeaturePopup: false,
  showExtendPopup: false,
  showProductRairtyScorePopup: false,
  productRairtyScorePopupContent: {},
  featurePopupContent: [],
  featurePopupType: 'nft',
  featurePopupNFT: {},
  extendPopupContent: [],
  extendPopupNFT: {},
  extendPopupType: 'nft',
  mintersPopupContent: [],
  showFeatureYourContentPopup: false,
  showSubscribePopup: null,
  user: {
    token: '',
    user: {}
  },
  showeyeSwapProtoggle: false,
  type: '',
  active_Network: null,
  active_token: null,
  eyeSwapProPopuptokenitem: {},
  eyeSwapProPopupnetworkitem: {},
  eyeSwapProPopupactiveId: null,
  eyeSwapProPopuptype: '',
  showGenerativeActionPopup: false,
  actionPopupAction: 'remove',
  showAddAttributeAndTrait: false,
  statusAddAttributeAndTraits: '',
  showEditBackgroundPopup: false,
  showGeneratedAccessPass: false,
  generativeAccessPassFrom: 'listing',
  showGenerationErrorPopup: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateTheme: (state) => {
      localStorage.setItem('darkTheme', !state.darkTheme);
      state.darkTheme = !state.darkTheme;
    },
    updateIsLogin: (state, action) => {
      localStorage.setItem('isLogin', action.payload);
      state.isLogin = action.payload;
    },
    changeNetwork: (state, action) => {
      state.activeNetwork = action.payload;
    },
    setActiveNetwork: (state, action) => {
      state.activeNetwork = action.payload;
    },
    updateTimerPopup: (state) => {
      state.timerPopup = true;
    },
    updateActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    updateRegisterPopup: (state) => {
      state.registerPopup = true;
    },
    updateLoggedInUser: (state, action) => {
      state.user.token = action.payload;
    },
    toggleEyeDropdown: (state, action) => {
      state.showEyeDropdown = !state.showEyeDropdown;
      state.getActiveTokenId = action.payload.getId;
      state.setTypeofPopup = action.payload.type;
      state.getActiveNetwork = action.payload.token;
    },
    eyeSwapProPopup: (state, action) => {
      state.showeyeSwapProtoggle = !state.showeyeSwapProtoggle;
      state.type = action.payload.type;
      state.active_Network = action.payload.active_Network;
      state.active_token = action.payload.active_token;
    },
    closeeyeSwapProPopup: (state, action) => {
      state.showeyeSwapProtoggle = false;
      state.eyeSwapProPopuptokenitem = action.payload.tokenitem;
      state.eyeSwapProPopupnetworkitem = action.payload.networkitem;
      state.eyeSwapProPopupactiveId = action.payload.activeId;
      state.eyeSwapProPopuptype = action.payload.type;
    },
    closeEyeDropdown: (state) => {
      state.showEyeDropdown = false;
    },
    toggleGeneralPopup: (state, action) => {
      state.showGeneralPopup = true;
      state.messageGeneralPopup = action.payload.message;
      state.submessageGeneralPopup = action.payload.submessage;
      state.textButtonGeneralPopup = action.payload.textButton;
      state.linkButtonGeneralPopup = action.payload.linkButton;
      state.copyTextGeneralPopup = action.payload.copyText;
      state.copyTextLinkGeneralPopup = action.payload.copyTextLink;
      state.titleGeneralPopup = action.payload.title;
      state.statusGeneralPopup = action.payload.status;
      state.autoCloseGeneralPopup = action.payload.autoClose
        ? action.payload.autoClose
        : 'true';
      state.sizeGeneralPopup = action.payload.size ? action.payload.size : 'sm';
    },
    togglePartnersPopup: (state, action) => {
      state.showPartnersPopup = !state.showPartnersPopup;
    },
    closePartnersPopup: (state) => {
      state.showPartnersPopup = false;
    },
    toggleActionPopup: (state, action) => {
      state.showGenerativeActionPopup = !state.showGenerativeActionPopup;
      state.actionPopupAction = action.payload.message;
    },
    closeActionPopup: (state) => {
      state.showGenerativeActionPopup = false;
    },
    toggleAddAttributeAndTrait: (state, action) => {
      state.showAddAttributeAndTrait = !state.showAddAttributeAndTrait;
      state.statusAddAttributeAndTraits = action.payload.status;
    },
    closeAddAttributeAndTrait: (state) => {
      state.showAddAttributeAndTrait = false;
    },
    toggleMintersPopup: (state, action) => {
      state.showMintersPopup = !state.showMintersPopup;
      state.mintersPopupContent = action.payload.content;
    },
    closeMintersPopup: (state) => {
      state.showMintersPopup = false;
    },

    toggleAboutBuyPopup: (state) => {
      state.showAboutBuyPopup = !state.showAboutBuyPopup;
    },
    closeAboutBuyPopup: (state) => {
      state.showAboutBuyPopup = false;
    },
    toggleGenerativeImagePopup: (state) => {
      state.showGenerativeImagePreview = !state.showGenerativeImagePreview;
    },
    closeGenerativeImagePopup: (state) => {
      state.showGenerativeImagePreview = false;
    },
    toggleGenerativeUploadPopup: (state, action) => {
      state.showGenerativeUploadPopup = !state.showGenerativeUploadPopup;
    },
    closeGenerativeUploadPopup: (state) => {
      state.showGenerativeUploadPopup = false;
    },
    toggleEditBackgroundPopup: (state) => {
      state.showEditBackgroundPopup = !state.showEditBackgroundPopup;
    },
    closeEditBackgroundPopup: (state) => {
      state.showEditBackgroundPopup = false;
    },
    toggleCharityDonatePopup: (state, action) => {
      state.showCharityDonatePopup = !state.showCharityDonatePopup;
      state.getCharityDonationcurrencies = action.payload.currencies;
      state.getCharityDonationorganizationdata = action.payload.organizationdata;
      state.gettoken = action.payload.token;
    },
    closeCharityDonatePopup: (state) => {
      state.showCharityDonatePopup = false;
    },
    toggleSocialPopup: (state) => {
      state.showSocialPopup = !state.showSocialPopup;
    },
    closeSocialPopup: (state) => {
      state.showSocialPopup = false;
    },
    toggleImagePreviewPopup: (state) => {
      state.showImagePreviewPopup = !state.showSocialPopup;
    },
    closeImagePreviewPopup: (state) => {
      state.showImagePreviewPopup = false;
    },
    toggleGeneratiedAccessPass: (state, action) => {
      state.showGeneratedAccessPass = !state.showGeneratedAccessPass;
      state.generativeAccessPassFrom = action.payload.accessFrom;
    },
    closeGeneratedAccessPass: (state) => {
      state.showGeneratedAccessPass = false;
    },
    toggleBurnPopup: (state, action) => {
      state.showBurnPopup = !state.showBurnPopup;
      state.burnPopupContent = action.payload.content;
      state.currentNFT = action.payload.nft;
    },
    closeBurnPopup: (state) => {
      state.showBurnPopup = false;
    },
    togglePurchaseCompletePopup: (state) => {
      state.showPurchaseComplete = !state.showPurchaseComplete;
    },
    closePurchaseCompletePopup: (state) => {
      state.showPurchaseComplete = false;
    },
    toggleFeaturePopup: (state, action) => {
      state.showFeaturePopup = !state.showFeaturePopup;
      state.featurePopupContent = action.payload.content;
      state.featurePopupType = action.payload.type
        ? action.payload.type
        : 'nft';
      state.featurePopupNFT = action.payload.nft ? action.payload.nft : {};
    },
    closeFeaturePopup: (state) => {
      state.showFeaturePopup = false;
    },

    toggleExtendPopup: (state, action) => {
      state.showExtendPopup = !state.showExtendPopup;
      state.extendPopupContent = action.payload.content;
      state.extendPopupType = action.payload.type ? action.payload.type : 'nft';
      state.extendPopupNFT = action.payload.nft ? action.payload.nft : {};
    },
    closeExtendPopup: (state) => {
      state.showExtendPopup = false;
    },

    toggleProductRairtyScorePopup: (state, action) => {
      state.showProductRairtyScorePopup = !state.showProductRairtyScorePopup;
      state.productRairtyScorePopupContent = action.payload?.content;
    },
    closeProductRairtyScorePopup: (state) => {
      state.showProductRairtyScorePopup = false;
    },

    closeGeneralPopup: (state, action) => {
      state.showGeneralPopup = false;
    },

    closeCollectionPopup: (state) => {
      state.showCollectionPopup = false;
    },

    toggleCharityPlacePopup: (state) => {
      state.showCharityPlacePopup = !state.showCharityPlacePopup;
    },
    openImagePopupCropp: (state, action) => {
      state.ImagePopupCroppFile = action.payload.file;
      state.imagePopupCroppAspect = action.payload.aspect;
      state.showImagePopupCropp = !state.showImagePopupCropp;
      state.imagePopupCroppCoordinate = null;
    },
    closeImagePopupCropp: (state, action) => {
      state.ImagePopupCroppFile = null;
      state.showImagePopupCropp = false;
    },
    updateImagePopupCroppCoordinate: (state, action) => {
      state.imagePopupCroppCoordinate = action.payload;
      state.ImagePopupCroppFile = null;
      state.showImagePopupCropp = false;
    },

    toggleSubscribePopup: (state, action) => {
      state.showSubscribePopup = action.payload;
    },
    toggleGenerationErrorPopup: (state, action) => {
      state.showGenerationErrorPopup = !state.showGenerationErrorPopup;
    },
    closeGenerationErrorPopup: (state) => {
      state.showGenerationErrorPopup = false;
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  updateTheme,
  updateTimerPopup,
  updateLoggedInUser,
  updateActiveTab,
  updateRegisterPopup,
  changeNetwork,
  toggleGeneralPopup,
  statusGeneralPopup,
  toggleSocialPopup,
  closeSocialPopup,
  messageGeneralPopup,
  closeGeneralPopup,
  toggleCharityPlacePopup,
  closeCollectionPopup,
  openImagePopupCropp,
  closeImagePopupCropp,
  updateImagePopupCroppCoordinate,
  updateIsLogin,
  closeMintersPopup,
  toggleMintersPopup,
  togglePartnersPopup,
  closePartnersPopup,
  toggleAirdropsPopup,
  toggleBurnPopup,
  closeBurnPopup,
  togglePurchaseCompletePopup,
  closePurchaseCompletePopup,
  toggleImagePreviewPopup,
  closeImagePreviewPopup,
  closeAboutBuyPopup,
  toggleAboutBuyPopup,
  closeEyeDropdown,
  toggleEyeDropdown,
  eyeSwapProPopup,
  closeeyeSwapProPopup,
  closeCharityDonatePopup,
  toggleCharityDonatePopup,
  toggleFeaturePopup,
  toggleExtendPopup,
  closeExtendPopup,
  closeFeaturePopup,
  toggleGenerativeImagePopup,
  closeGenerativeImagePopup,
  toggleGenerativeUploadPopup,
  closeGenerativeUploadPopup,
  toggleSubscribePopup,
  closeProductRairtyScorePopup,
  toggleProductRairtyScorePopup,
  toggleActionPopup,
  closeActionPopup,
  toggleAddAttributeAndTrait,
  closeAddAttributeAndTrait,
  toggleEditBackgroundPopup,
  closeEditBackgroundPopup,
  toggleGeneratiedAccessPass,
  closeGeneratedAccessPass,
  toggleGenerationErrorPopup,
  closeGenerationErrorPopup,
  setActiveNetwork
} = appSlice.actions;

export default appSlice.reducer;
