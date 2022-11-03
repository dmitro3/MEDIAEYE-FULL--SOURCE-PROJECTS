import React from "react";
import "./Library.scss";
import { publclibrary } from "../../utils/jsonData";

const PublicCard = (props) => {
  const partners = publclibrary();
  const contentType = props.type;

  return(
    
    <>
    {partners.map((number) => 
    contentType === "All" ? 
    <div className="mediaLibrarypage-cardbox">
      <div className="avatarprofile">
        <img
          className="avatarprofile-avtimg"
          src={number.avtimg}
          alt="no-img"
        />
      </div>
      <div className="avatardetail">
        <h6 className="avatardetail-title">{number.title}</h6>
        <div className="avatarinside">
          <p className="name">
            by <span className="color">{number.from}</span>
          </p>
          {number.tokenName === "Free" ||  number.tokenName === "Paid"?  <p className="plan">{number.tokenName}</p> 
          :<p className="plan"><img src={number.tokenImg}  className="tokenimg" alt={number.tokenName}/>{number.tokenValue} {number.tokenName}</p> 
          }
        </div>
      </div>
    </div>
     : contentType === number.type ?
     <div className="mediaLibrarypage-cardbox">
      <div className="avatarprofile">
        <img
          className="avatarprofile-avtimg"
          src={number.avtimg}
          alt="no-img"
        />
      </div>
      <div className="avatardetail">
        <h6 className="avatardetail-title">{number.title}</h6>
        <div className="avatarinside">
          <p className="name">
            by <span className="color">{number.from}</span>
          </p>
          {number.tokenName === "Free" ||  number.tokenName === "Paid"?  <p className="plan">{number.tokenName}</p> 
          :<p className="plan"><img src={number.tokenImg}  className="tokenimg" alt={number.tokenName}/>{number.tokenValue} {number.tokenName}</p> 
          }
        </div>
      </div>
    </div>
      :  null
    )};
    </>
  );
}
export default PublicCard;