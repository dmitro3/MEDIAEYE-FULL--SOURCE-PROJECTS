import React, { useEffect, useState } from "react";
import "./MyCollection.scss";
import { collectionService } from "../../services/api.service";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Collect from "../Collect/Collect";
import Minter from "../Minter/Minter";

const MyCollection = () => {
  const [ setCollections] = useState([]);
  const [value, setValue] = useState(0);
  // const navigate = useNavigate();
  // const navigateTocollection = (id) => {
  //   navigate(`/my-new-collection?collection=${id}`);
  // };

  useEffect(() => {
    async function getCollections() {
      const res = await collectionService.fetch();
      console.log(res,'res;')
      setCollections(res);
    }
    getCollections();
  }, [])


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
          <Box sx={{ p: 2 }}>
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
      {/* <div className="mediaProfilepage-datacontent-profiledetail-body-avatarbox"> */}
        {/* {
          collections.map((collection, i) => (
            <div key={i} className="useravatar NFT_box" onClick={()=>navigateTocollection(collection.id)}>
              <img src={`${baseUrl}/upload/${collection.image}`} alt="No img" />
              <span>{collection.name}</span>
            </div>
          ))
        } */}
         
         <div className="mediaProfilepage-datacontent-profiledetail-body-activitybox">
          <div className="mediaProfilepage-datacontent-profiledetail-body-activitybox-content">
            <div className="">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="My Collection" {...inactProps(0)} />
                <Tab label="Minter" {...inactProps(1)} />
              </Tabs>
            </div>
            <div className="mediaProfilepage-datacontent-profiledetail-body">
              <TabPanel value={value} index={0}>
                <Collect />
               
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Minter />
              </TabPanel>
              
            </div>
          </div>
         </div>
      {/* </div> */}
    </React.Fragment>
  );
};

export default MyCollection;
