import React from 'react';
import "./Minter.scss";
import CardCollect from "../CardCollect/CardCollect";
import Data from "../CardCollect/CardData";

const Minter = () => {
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

export default Minter;