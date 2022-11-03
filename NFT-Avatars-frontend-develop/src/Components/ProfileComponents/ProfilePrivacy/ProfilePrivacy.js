import React, { useState } from "react";
import { DownArrow } from "../../icons";
import "./ProfilePrivacy.scss";
import Select from "react-select";

const ProfilePrivacy = ({ privacy, handlePrivacy }) => {
  const [showMore, setShowMore] = useState(false);

  const options = [
    { label: "Everyone", value: "Everyone" },
    { label: "Followers ", value: "Followers" },
    { label: "Followers except...", value: "Followers except..." },
    { label: "Specific followers...", value: "Specific followers..." },
    { label: "Only me ", value: "Only me" },
  ];

  const handleShow = () => {
    setShowMore(!showMore);
  };

  // handle privacy
  const changePrivacy = async (e, name) => {
    let temp = { ...privacy };
    temp[name] = e;
    await handlePrivacy(temp);
  }

  return (
    <>
      <div className="privacy-page">
        <div className="privacy-page-content">
          {/* personal information */}
          <h1 className="privacy-page-content-head">Personal Information</h1>
          <div className="privacy-page-content-row d-flex text-between text-align-center">
            <h2>
              Who can see your <span>Username</span>
            </h2>
            <Select
              options={options}
              value={privacy.username}
              className="mediaeyeAvatar-select"
              classNamePrefix="mediaeyeAvatar-select"
              onChange={(value) => changePrivacy(value, 'username')}
            />
          </div>
          <div className="privacy-page-content-row d-flex text-between text-align-center">
            <h2>
              Who can see your <span>Email</span>
            </h2>
            <Select
              options={options}
              value={privacy.email}
              className="mediaeyeAvatar-select"
              classNamePrefix="mediaeyeAvatar-select"
              onChange={(value) => changePrivacy(value, 'email')}
            />
          </div>
          <div className="privacy-page-content-row d-flex text-between text-align-center">
            <h2>
              Who can see your <span>Bio</span>
            </h2>
            <Select
              options={options}
              value={privacy.bio}
              className="mediaeyeAvatar-select"
              classNamePrefix="mediaeyeAvatar-select"
              onChange={(value) => changePrivacy(value, 'bio')}
            />
          </div>
          <div className="privacy-page-content-row d-flex text-between text-align-center">
            <h2>
              Who can see your <span>Relationship status</span>
            </h2>
            <Select
              options={options}
              value={privacy.relationship}
              className="mediaeyeAvatar-select"
              classNamePrefix="mediaeyeAvatar-select"
              onChange={(value) => changePrivacy(value, 'relationship')}
            />
          </div>
        </div>
        <div className="privacy-page-content">
          <h1 className="privacy-page-content-head">Socials</h1>
          <div className="privacy-page-content-row d-flex text-between text-align-center">
            <h2>
              Who can see your <span>Social Accounts</span>
            </h2>
            <Select
              options={options}
              value={privacy.social}
              className="mediaeyeAvatar-select"
              classNamePrefix="mediaeyeAvatar-select"
              onChange={(value) => changePrivacy(value, 'social')}
            />
          </div>
        </div>
        {showMore ? (
          <>
            <div className="privacy-page-content">
              {/* creatives */}
              <h1 className="privacy-page-content-head">Creatives</h1>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Music</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.musics}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'musics')}
                />
              </div>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Videos</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.videos}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'videos')}
                />
              </div>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Art</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.art}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'art')}
                />
              </div>
            </div>
            <div className="privacy-page-content">
              {/* communities */}
              <h1 className="privacy-page-content-head">Communities</h1>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Communities</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.communities}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'communities')}
                />
              </div>
            </div>
            <div className="privacy-page-content">
              <h1 className="privacy-page-content-head">Preferences</h1>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Preferences</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.preference}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'preference')}
                />
              </div>
            </div>
            <div className="privacy-page-content">
              <h1 className="privacy-page-content-head">Petavatars</h1>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Pet Bio</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.petBio}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'petBio')}
                />
              </div>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Pedigree</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.pedigree}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'pedigree')}
                />
              </div>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Awards and Shows</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.awards}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'awards')}
                />
              </div>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Health Certificates</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.healthCertificates}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'healthCertificates')}
                />
              </div>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Favorite Treats and Food</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.favorits}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'favorits')}
                />
              </div>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Pet Pics and Videos</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.petPics}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'petPics')}
                />
              </div>
            </div>
            <div className="privacy-page-content">
              <h1 className="privacy-page-content-head">Personal Activities</h1>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Wallet History</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.walletHistory}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'walletHistory')}
                />
              </div>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>DeFi History</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.defiHistory}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'defiHistory')}
                />
              </div>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Voting History</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.votingHistory}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'votingHistory')}
                />
              </div>
            </div>
            <div className="privacy-page-content">
              <h1 className="privacy-page-content-head">Following Settings</h1>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Followers</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.followers}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'followers')}
                />
              </div>
              <div className="privacy-page-content-row d-flex text-between text-align-center">
                <h2>
                  Who can see your <span>Followings</span>
                </h2>
                <Select
                  options={options}
                  value={privacy.followings}
                  className="mediaeyeAvatar-select"
                  classNamePrefix="mediaeyeAvatar-select"
                  onChange={(value) => changePrivacy(value, 'followings')}
                />
              </div>
            </div>
          </>
        ) : null}
        <span
          className={showMore ? "show-content less" : "show-content"}
          onClick={handleShow}
        >
          Show {showMore ? "less" : "more"} <DownArrow />
        </span>
      </div>
    </>
  );
};

export default ProfilePrivacy;
