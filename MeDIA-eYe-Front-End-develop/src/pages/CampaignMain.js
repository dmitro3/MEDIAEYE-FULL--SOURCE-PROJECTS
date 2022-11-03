// import React from 'react';
// import CampaignPage from '../components/Campaigns/CampaignPage';

// const Campaign = (props) => {
//   const { closeNftCollapse } = props;

//   return (
//     <React.Fragment>
//       <div onClick={closeNftCollapse} className="mediaeye-layout-content">
//         <CampaignPage />
//       </div>
//     </React.Fragment>
//   );
// };

// export default Campaign;
import React from 'react';
import CampaignPage from '../components/Campaigns/CampaignPage';

export default function CampaignMain(props) {
  const { closeNftCollapse } = props;
  return (
    <React.Fragment>
      <div onClick={closeNftCollapse} className="mediaeye-layout-content">
        <CampaignPage />
      </div>
    </React.Fragment>
  );
}
