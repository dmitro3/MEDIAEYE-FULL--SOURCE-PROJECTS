import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../components/NewAboutUs/NewAboutUs.scss';
import WhyBlock from '../components/NewAboutUs/WhyBlock';
import ServiceBlock from '../components/NewAboutUs/ServiceBlock';
import BespokeService from '../components/NewAboutUs/BespokeService';
import Metahub from '../components/NewAboutUs/Metahub';
import Tokenomics from '../components/NewAboutUs/Tokenomics';
import Opportunities from '../components/NewAboutUs/Opportunities';
import HowBlock from '../components/NewAboutUs/HowBlock';
import Community from '../components/Community/Community';
import Faq from '../components/Faq/Faq';
import Partners from '../components/Partners/Partners';
import Roadmap from '../components/Roadmap/Roadmap';
import Team from '../components/Team/Team';
import MainForm from '../components/MainForm/MainForm';
import OpeningOpp from '../components/OpeningOpp/OpeningOpp';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const NewAboutUs = (props) => {
  const { closeNftCollapse } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [isActive, setActive] = useState(false);
  const ToggleClass = () => {
    setActive(!isActive);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>About | MEDIA EYE NFT Portal</title>
        <meta
          name="description"
          content="MEDIA EYE NFT Portal puts the power of blockchain to work for your next marketing campaign, promotion, rewards or creating a collectible."
        ></meta>
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content bottomnospace"
      >
        <div className="mediaeyefancyScroll">
          <div className="mediaeye-toggle ">
            {isActive ? (
              <div className="mediaeye-toggle-content" onClick={ToggleClass}>
                <Tabs
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  textColor="inherit"
                  indicatorColor="transparent"
                >
                  <Tab
                    className="mediaeye-MuiTabs"
                    label="What is MEDIA EYE?"
                    {...a11yProps(0)}
                  />
                  <Tab
                    className="mediaeye-MuiTabs nopad"
                    label="Core services"
                    {...a11yProps(1)}
                  />
                  <Tab
                    className="mediaeye-MuiTabs nopad"
                    label="Bespoke services"
                    {...a11yProps(2)}
                  />
                  <Tab
                    className="mediaeye-MuiTabs nopad"
                    label="How it works?"
                    {...a11yProps(3)}
                  />
                  <Tab
                    className="mediaeye-MuiTabs allCaps marginTop"
                    label="MetaHUB"
                    {...a11yProps(4)}
                  />
                  <Tab
                    className="mediaeye-MuiTabs allCaps"
                    label="TOKENOMICS"
                    {...a11yProps(5)}
                  />
                  <Tab
                    className="mediaeye-MuiTabs allCaps"
                    label="Opportunities"
                    {...a11yProps(6)}
                  />
                  <Tab
                    className="mediaeye-MuiTabs allCaps"
                    label="ROYALTIES"
                    {...a11yProps(7)}
                  />
                  <Tab
                    className="mediaeye-MuiTabs allCaps"
                    label="NFT Marketplace"
                    {...a11yProps(8)}
                  />
                  <Tab
                    className="mediaeye-MuiTabs allCaps"
                    label="Airdrops & Bounties"
                    {...a11yProps(9)}
                  />
                  <Tab
                    className="mediaeye-MuiTabs allCaps"
                    label="REWARDS"
                    {...a11yProps(10)}
                  />
                  <Tab
                    className="mediaeye-MuiTabs allCaps"
                    label="PARTNERSHIP"
                    {...a11yProps(11)}
                  />
                </Tabs>
              </div>
            ) : null}
            <button
              className={
                isActive
                  ? 'mediaeye-toggle-button active'
                  : 'mediaeye-toggle-button'
              }
              onClick={ToggleClass}
              id="sidebar_toggle"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <div className="mediaeye-toggle-about">
          <div className="main_block"></div>
          <TabPanel value={value} index={0}>
            <WhyBlock />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ServiceBlock />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BespokeService />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <HowBlock />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Metahub />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Tokenomics />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <Opportunities />
          </TabPanel>
          <TabPanel value={value} index={7}>
            <Roadmap />
          </TabPanel>
          <TabPanel value={value} index={8}>
            <OpeningOpp />
          </TabPanel>
          <TabPanel value={value} index={9}>
            <Team />
          </TabPanel>
          <TabPanel value={value} index={10}>
            <Partners />
          </TabPanel>
          <TabPanel value={value} index={11}>
            <MainForm />
          </TabPanel>
          <TabPanel value={value} index={12}>
            <Community />
          </TabPanel>
          <TabPanel value={value} index={13}>
            <Faq />
          </TabPanel>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewAboutUs;
