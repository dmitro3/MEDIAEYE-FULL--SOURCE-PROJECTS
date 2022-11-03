import React from 'react';
import "./Collect.scss";


import CardCollect from "../CardCollect/CardCollect";
import Data from "../CardCollect/CardData";

const Collect = () => {

  return (
    <>
      <div className='collect'>
        <div className='collect-inner'>
           {Data.map((val)=>{
            return(
              <CardCollect
              Img={val.userImg}
              Title={val.userTitle}
              Name={val.userName}
              Description={val.userDescription}
            />
            )
           })}
        </div>  
      </div>
    </>
  )
        }
export default Collect;