import React, { useEffect, useState } from "react";
// import Select from "react-select";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Setting from "../../Components/icons/Setting";
import "./MainProfile.scss";
import ProfileChangeBio from "../ProfileComponents/ProfileChangeBio/ProfileChangeBio";
import ProfileSocials from "../ProfileComponents/ProfileSocials/ProfileSocials";
import ProfileCreatives from "../ProfileComponents/ProfileCreatives/ProfileCreatives";
import ProfileCommunities from "../ProfileComponents/ProfileCommunities/ProfileCommunities";
import ProfilePreferred from "../ProfileComponents/ProfilePreferred/ProfilePreferred";
import DownArrow from "../icons/DownArrow";
import SideMainProfile from "../../Components/SideMainProfile/SideMainProfile";
import { session } from "../../utils/session.util";
import { userService } from "../../services/api.service";
import ProfilePrivacy from "../ProfileComponents/ProfilePrivacy/ProfilePrivacy";


const defaultPrivacy = {
  username: null,
  email: null,
  bio: null,
  relationship: null,
  social: null,
  musics: null,
  videos: null,
  art: null,
  communities: null,
  preference: null,
  petBio: null,
  pedigree: null,
  awards: null,
  healthCertificates: null,
  favorits: null,
  petPics: null,
  walletHistory: null,
  defiHistory: null,
  votingHistory: null,
  followers: null,
  followings: null
}

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
          <Typography>{children}</Typography>
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

const MainProfile = () => {
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState({});

  // get user info from session

  useEffect(() => {
    const user = session.get("eye-user");
    setProfile(user);
  }, []);

  // handle profile change
  const handleProfile = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // update profile via backend
  const updateUser = async () => {
    await userService.update(profile);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // handle user social change
  const handleUserSocial = (payload) => {
    let temp = { ...profile };
    temp.socials = payload;
    setProfile(temp);
  };

  // handle privacy change
  const handlePrivacy = async (payload) => {
    let temp = { ...profile };
    temp.privacy = payload;
    await updateUser();
    setProfile(temp);
  }

  // handle creative change
  const handleCreative = (payload) => {
    let temp = { ...profile };
    temp.creative = payload;
    setProfile(temp);
  };

  // handle commuties change
  const handleCommunities = (payload) => {
    let temp = { ...profile };
    temp.communities = payload;
    setProfile(temp);
  };

  const emptyCreative = {
    musics: [],
    videos: [],
    art: [],
  };

  const [isActive_2, setActive_2] = useState("false");
  const ToggleClass_2 = () => {
    setActive_2(!isActive_2);
  };

  const [isVisible] = useState("profile");

  return (
    <React.Fragment>
      <div className="mediaProfilepage">
        <div className="mediaProfilepage-header">
          <div className="mediaProfilepage-header-inside">
            <Setting />
            <h5 className="mediaProfilepage-header-inside-title">
              Edit Your Profile
            </h5>
          </div>
        </div>
        <div className="mediaProfilepage-datacontent">
          <SideMainProfile profile={profile} />

          <div
            className={
              isActive_2
                ? "mediaProfilepage-datacontent-profiledetail edit"
                : "toggleOpen mediaProfilepage-datacontent-profiledetail edit"
            }
          >
            <button className="profile-toggle" onClick={ToggleClass_2}>
              {" "}
              <DownArrow /> Edit Your Profile
            </button>
            <div className="mediaProfilepage-datacontent-profiledetail-head">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Bio" {...a11yProps(0)} />
                <Tab label="Socials" {...a11yProps(1)} />
                <Tab label="Creative" {...a11yProps(2)} />
                <Tab label="Communities" {...a11yProps(3)} />
                <Tab
                  label="Preferred"
                  {...a11yProps(4)}
                  icon={<DownArrow />}
                ></Tab>
                <Tab label="Privacy" {...a11yProps(5)} />
              </Tabs>
              {/* <ul className='mediaProfilepage-datacontent-profiledetail-head-inner'>
                            <li><Select options={options} placeholder="Preferred" /></li>
                        </ul> */}
            </div>
            <div className="mediaProfilepage-datacontent-profiledetail-body">
              <TabPanel value={value} index={0}>
                <ProfileChangeBio
                  profile={profile}
                  setProfile={setProfile}
                  handleProfile={handleProfile}
                  updateUser={updateUser}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ProfileSocials
                  userSocial={profile.socials}
                  handleSocial={handleUserSocial}
                  updateUser={updateUser}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ProfileCreatives
                  creative={
                    !profile.creative ? emptyCreative : profile.creative
                  }
                  handleCreative={handleCreative}
                  isVisible={isVisible}
                  updateUser={updateUser}
                />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ProfileCommunities
                  communities={profile.communities}
                  handleCommunities={handleCommunities}
                  updateUser={updateUser}
                />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <ProfilePreferred updateUser={updateUser} />
              </TabPanel>
              <TabPanel value={value} index={5}>
                <ProfilePrivacy
                  updateUser={updateUser}
                  privacy={!profile.privacy ? defaultPrivacy : profile.privacy}
                  handlePrivacy={handlePrivacy}
                />
              </TabPanel>
              {/* <button onClick={updateUser} className="btn btn-dark">
                Save
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainProfile;
