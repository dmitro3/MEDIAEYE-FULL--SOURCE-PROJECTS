import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserCircle from "../../Components/icons/UserCircle";
import "./ShowProfile.scss";
import SideProfile from "../SideProfile/SideProfile";
import MyAvatar from "../MyAvatar/MyAvatar";
import MyNFT from "../MyNFT/MyNFT";
import MyCollection from "../Collection/MyCollection";
import ProfileCreatives from "../ProfileComponents/ProfileCreatives/ProfileCreatives";
import MyActivites from "../MyActivites/MyActivites";
import { useSearchParams } from "react-router-dom";

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
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ShowProfile = () => {
  const [value, setValue] = React.useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const tab = searchParams.get('tab');
    if(!tab) {
      setSearchParams({tab: 0});
      setValue(0);
    } else {
      setValue(Number(tab));
    }
  }, [searchParams]);

  const handleChange = (event, newValue) => {
    setSearchParams({tab: newValue});
  };

  return (
    <React.Fragment>
      <div className="mediaProfilepage">
        <div className="mediaProfilepage-header">
          <div className="mediaProfilepage-header-inside">
            <UserCircle />
            <h5 className="mediaProfilepage-header-inside-title">
              Your METAVATAR Profile
            </h5>
          </div>
        </div>
        <div className="mediaProfilepage-datacontent">
          <SideProfile />
          <div className="mediaProfilepage-datacontent-profiledetail fav">
            <div className="mediaProfilepage-datacontent-profiledetail-head">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="My Avatars" {...a11yProps(0)} />
                <Tab label="My NFTs" {...a11yProps(1)} />
                <Tab label="Collections" {...a11yProps(2)} />
                <Tab label="My Creatives" {...a11yProps(3)} />
                <Tab label="My Activities" {...a11yProps(4)} />
              </Tabs>
            </div>
            <div className="mediaProfilepage-datacontent-profiledetail-body">
              <TabPanel value={value} index={0}>
                <MyAvatar />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <MyNFT />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <MyCollection />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ProfileCreatives />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <MyActivites />
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShowProfile;
