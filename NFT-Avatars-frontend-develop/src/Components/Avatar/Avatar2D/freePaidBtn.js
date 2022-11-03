import React, {useState} from "react";

export function FreePaidBtn({handleClick}) {

  const [isFree, setIsFree] = useState("free");

  const freePaid = (type) => {
    setIsFree(type);
  }

  // const [ishide, setIsFree] = useState("free");

  return (
      <div className="free-paid-btn-wrap">
        <button onClick={(e) => { freePaid("free"); handleClick("free");}} type="button" className={isFree === "free" ? 'free-paid-btn active' : 'free-paid-btn'}>free</button>
        <button onClick={(e) => { freePaid("paid"); handleClick("paid");}} type="button" className={isFree === "paid" ? 'free-paid-btn active' : 'free-paid-btn '}>paid</button>
      </div>
  );
}
export default FreePaidBtn;
