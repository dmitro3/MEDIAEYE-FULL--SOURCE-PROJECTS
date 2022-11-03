import React from 'react';
import "./CardCollect.scss";

import demowl from "../../assets/images/art-img-2.png";
import Discrd  from "../icons/Discrd";
import GlobeSc  from "../icons/GlobeSc";
import Twitte  from "../icons/Twitte";
import Telegrm  from "../icons/Telegrm";
import InstaSc  from "../icons/InstaSc";
import { Link } from 'react-router-dom';

const CardCollect = (props) => {
 const {Title, Name, Description} = props;
 console.log(Title, Name, Description, "sdfsdfsdf");
  return (
    <>
      <div className='collect-card'>
            <div className='collect-card-inner'>
              <img src={demowl} className='img-banner' alt="bg"/>
              <div className='card-detail'>
                <div className='card-img'>
                  <img src={props.Img} className='card-usimg' alt="no-img"/>
                  </div>
                  <div className='card-detail-inner'>
                    <h4 className='card-title'>{props.Title}</h4>
                    <h5 className='card-user'>Creator: <span className='name'>{props.Name}</span></h5>
                    <p className='card-description'>{props.Description}</p>
                    <div className='card-social'>
                      <ul className='card-social-list'>
                        <li className='card-social-list-item'><Link to="#" className='card-social-list-item-tag'><GlobeSc/></Link></li>
                        <li className='card-social-list-item'><Link to="#" className='card-social-list-item-tag'><InstaSc/></Link></li>
                        <li className='card-social-list-item'><Link to="#" className='card-social-list-item-tag'><Telegrm/></Link></li>
                        <li className='card-social-list-item'><Link to="#" className='card-social-list-item-tag'><Twitte/></Link></li>
                        <li className='card-social-list-item'><Link to="#" className='card-social-list-item-tag'><Discrd/></Link></li>
                      </ul>
                    </div>
                  </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default CardCollect;