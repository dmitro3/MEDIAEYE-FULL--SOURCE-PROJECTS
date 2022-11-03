import React, {  useState } from "react";
import "./MyActivites.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import WalletHistory from "../WalletHistory/WalletHistory";
import NftHistory from "../NftHistory/NftHistory";
import DefiHistory from "../DefiHistory/DefiHistory";
import VotingHistory from "../VotingHistory/VotingHistory";



const MyActivites = () => {
  const [value, setValue] = useState(0);
  // const [isOpen, setOpen] = useState(false);

  // const [items] = useState(activity);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 4 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function inactProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <React.Fragment>
      <div className="mediaProfilepage-datacontent-profiledetail-body-activitybox">
        <div className="mediaProfilepage-datacontent-profiledetail-body-activitybox-content">
          <div className="">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Wallet History" {...inactProps(0)} />
              <Tab label="NFT History" {...inactProps(1)} />
              <Tab label="DeFi History" {...inactProps(2)} />
              <Tab label="Voting History" {...inactProps(3)} />
            </Tabs>
          </div>
          <div className="mediaProfilepage-datacontent-profiledetail-body">
            <TabPanel value={value} index={0}>
              <WalletHistory />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <NftHistory />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <DefiHistory />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <VotingHistory />
            </TabPanel>
          </div>
         
        </div>

        
      </div>
    </React.Fragment>
  );
};

export default MyActivites;
