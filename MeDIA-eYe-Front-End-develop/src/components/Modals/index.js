import React from 'react';
import GeneralPopup from '../GeneralPopup/Popup';
import MintersPopup from './MintersPopup/Popup';
import BurnPopup from './BurnPopup/Popup';
import FeaturePopup from './FeaturePopup/Popup';
import ExtendPopup from '../Features/FeatureNft/Extend/ExtendPopup';
import AboutBuyPopup from './AboutBuyPopup/AboutBuyPopup';
import CharityDonatePopup from './CharityDonatePopup/CharityDonatePopup';
import AirdropSocialPopup from './AirdropSocialPopup/AirdropSocialPopup';
import ProductRairtyScorePopup from './ProductRairtyScorePopup/ProductRairtyScorePopup';
import PartnersPopup from './PartnersPopup/PartnersPopup';
import EyeDropdown from './EyeSwap-Open/EyeDropdown';
import PurchaseComplete from './PurchaseComplete/PurchaseComplete';
import EyeSwapProPopup from './EyeSwapPopup/EyeSwapProPopup';
import GenerativeImagePopup from './GenerativeImagePreview/GenerativeImagePopup';
import GenerativeUpload1of1 from './GenerativeUpload1of1/GenerativeUpload1of1';
import ActionPopup from './ActionPopup/ActionPopup';
import AddAttributeAndTrait from './AddAttributeAndTrait/AddAttributeAndTrait';
import EditBackgroundPopup from './EditBackgrounPopup/EditBackgroundPopup';
import GeneratedAccessPasses from './GeneratedAccessPasses/GeneratedAccessPasses';
import GenerationErrorPopup from './GenerationErrorPopup/GenerationErrorPopup';
export default function () {
  return (
    <React.Fragment>
      <GeneralPopup />
      <MintersPopup />
      <BurnPopup />
      <FeaturePopup />
      <ExtendPopup />
      <AboutBuyPopup />
      <EyeDropdown />
      <CharityDonatePopup />
      <AirdropSocialPopup />
      <ProductRairtyScorePopup />
      <PartnersPopup />
      <PurchaseComplete />
      <EyeSwapProPopup />
      <GenerativeImagePopup />
      <GenerativeUpload1of1 />
      <ActionPopup />
      <AddAttributeAndTrait />
      <EditBackgroundPopup />
      <GeneratedAccessPasses />
      <GenerationErrorPopup />
    </React.Fragment>
  );
}
