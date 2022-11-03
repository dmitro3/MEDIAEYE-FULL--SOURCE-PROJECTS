import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Tabs from '../../Common/AnimatedTab/Tabs';
import CollectionAppearanceAndSocial from './CollectionAppearanceAndSocial/CollectionAppearanceAndSocial';
import CollectionListingStages from './CollectionListingStages/CollectionListingStages';
import CollectionManageTab from './CollectionManageTab/CollectionManageTab';
import './CollectionPreview.scss';
import CollectionSettings from './CollectionSettings/CollectionSettings';
import CollectionPreviewTab from './CollectionTabs/CollectionPreviewTab/CollectionPreviewTab';
import Dexie from 'dexie';

const tabs = [
  'Preview',
  'Manage',
  'Settings',
  'Listing Stages',
  'Appearance & Social'
];

export default function CollectionPreview(props) {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(0);
  const { active, user, isOwner } = props;
  const { page, userAddress } = useParams();
  const [ourData, setOurData] = useState([]);
  const [allFolders, setAllFolders] = useState([]);
  const [allUploaded, setAllUploaded] = useState([]);
  const [demoList, setDemoList] = useState([]);
  const [activeTabValue, setactiveTabValue] = useState(
    active ? active : 'Preview'
  );
  const [traits, setTraits] = useState([]);


  const updateLayers = async (data) => {
    await db.layers.bulkPut(data);
    await getTraits();
  }


  // remove layer 
  const disableLayer = async (layerName) => {
    setTraits([]);
    await db.layers.delete(layerName);
    getTraits();
  }

  const updateLayer = async (key, data) => {
    await db.layers.update(key, data);
    getTraits();
  }

  // generate one demo
  const generateDNA = () => {
    let randList = [];
    traits.forEach(trait => {
        const totalWeight = 100;
        let random = Math.floor(Math.random() * totalWeight);
        for (let i = 0; i < trait.files.length; i++) {
            if (random < trait.files[i].rarity) {
                return randList.push(i);
            } else {
                random -= trait.files[i].rarity;
            }
        }
    });
    return randList.join('-');
}

  // indexed db
  const db = new Dexie("ReactDexie");
  db.version(1).stores({
    layers: 'name, rarity, files, folder'
  });

  // get data from indexed db
  async function getTraits() {
    const allLayers = await db.layers.toArray();  
    setTraits(Object.values(allLayers));
  }
  useEffect(() => {
    getTraits();
  }, []);

  
  useEffect(() => {
    let temp = [];
    while (temp.length < 20) {
      const newDNA = generateDNA();
      temp.push(newDNA);
      setDemoList(temp);
    }
  }, [traits]);

  const onTabChange = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
      openAccountTabs(tabs[index]);
    }
  };
  const openAccountTabs = (tab) => {
    setactiveTabValue(tab);
    if (page) {
      history.replace(`/account/${userAddress}/${tab}`);
    }
  };
  const activeComponent = {
    0: <CollectionPreviewTab demoList={demoList} data={ourData} allFolders={traits} />,
    1: <CollectionManageTab delLayer={disableLayer} updateLayer={updateLayer} layers={traits} updateLayers={updateLayers}/>,
    2: <CollectionSettings data={ourData} allFolders={allFolders} allUploaded={allUploaded} />,
    3: <CollectionListingStages data={ourData} allFolders={allFolders} allUploaded={allUploaded} />,
    4: <CollectionAppearanceAndSocial data={ourData} allFolders={allFolders} allUploaded={allUploaded} />
  };

  return (
    <div className="mediaeye-layout-content collcetion-preview">
      <div className="mediaeye-layout-container">
        <div className="mediaeye-tabss">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
        </div>
        {activeComponent[activeTab]}
      </div>
    </div>
  );
}
