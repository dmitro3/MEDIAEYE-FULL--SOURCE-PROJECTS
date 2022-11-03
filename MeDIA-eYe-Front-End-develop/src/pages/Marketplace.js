import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Tabs from '../components/Common/AnimatedTab/Tabs';
import { useHistory, useParams } from 'react-router-dom';
import '../components/Marketplace/Marketplace.scss';
import MarketplaceNfts from '../components/Marketplace/nft/MarketplaceNfts';
import MarketplaceHeader from '../components/Marketplace/MarketplaceHeader';
import MarketplaceCollection from '../components/Marketplace/collection/MarketplaceCollection';
import MarketplaceSpotlight from '../components/Marketplace/spotlight/MarketplaceSpotlight';
import MarketplaceCharity from '../components/Marketplace/charity/MarketplaceCharity';
import MarketplaceCampaigns from '../components/Marketplace/campaigns/MarketplaceCampaigns';
import MarketplaceAirdrops from '../components/Marketplace/airdrops/MarketplaceAirdrops';

const Marketplace = (props) => {
    const { closeNftCollapse } = props;
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const marketplaceRef = useRef(null);
    const [fixedLayout, setFixedLayout] = useState(false);
    const [moreAvailalbe, setMoreAvailalbe] = useState(true);
    const { page } = useParams();
    useEffect(() => {
        if (page) {
            if (tabs.indexOf(page) < 0) {
                history.replace(`/marketplace/`);
                return;
            } else {
                setActiveTab(tabs.indexOf(page));
                setactiveTabValue(page);
            }
        }
    }, [page]);

    const tabs = ['NFTs', 'Collections', 'Spotlight', 'Charity', 'Campaigns', 'Airdrops'];
    const [activeTabValue, setactiveTabValue] = useState('NFTs');
    const [activeTab, setActiveTab] = useState(0);
    const history = useHistory();
    const onTabChange = (index) => {
        if (activeTab !== index) {
            setActiveTab(index);
            openAccountTabs(tabs[index]);
        }
    }
    const openAccountTabs = (tab) => {
        setactiveTabValue(page);
        history.replace(`/marketplace/${tab}`);
    }

    const activeComponent = {
        NFTs: <MarketplaceNfts setMoreAvailalbe={setMoreAvailalbe} />,
        Collections: <MarketplaceCollection setMoreAvailalbe={setMoreAvailalbe} />,
        Spotlight: <MarketplaceSpotlight />,
        Charity: <MarketplaceCharity />,
        Campaigns: <MarketplaceCampaigns />,
        Airdrops: <MarketplaceAirdrops />,
    }

    const manageScrollData = () => {
        const currentScrollY = window.scrollY + 20;
        if (currentScrollY >= marketplaceRef?.current?.offsetTop) {
            if ((currentScrollY + marketplaceRef.current.offsetTop + 100) > marketplaceRef.current.clientHeight && !moreAvailalbe) {
                setFixedLayout(false);
            } else {
                setFixedLayout(true);
            }
        } else {
            setFixedLayout(false);
        }
    };

    useEffect(() => {
        window.removeEventListener("scroll", manageScrollData)
        window.addEventListener("scroll", manageScrollData);
    }, [marketplaceRef, moreAvailalbe]);
    return (
        <>
            <div className="mediaeye-layout-content marketplace-page" onClick={closeNftCollapse}>
                <MarketplaceHeader />
                <div className={`marketplace-page-inner ${fixedLayout ? 'marketplace-page-fixed' : ''}`} ref={marketplaceRef}>

                    <div className="mediaeye-tabss marketplace-page-tabs mediaeye-layout-middle">
                        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
                    </div>
                    <div className='mediaeye-layout-middle marketplace-page-content'>
                        {activeComponent[activeTabValue]}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Marketplace;