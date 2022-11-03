import React from "react";
import "./Card.css";
const Card = ({ title, children }) => {
  return (
    <>
      <div className="Card">
        <div className="Card-header">
          <h4>{title}</h4>
        </div>
        {children}
      </div>
    </>
  )
}
export default Card;
// export default ({ title, children }) => {
//   return (
//     <div className="Card">
//       <div className="Card-header">
//         <h4>{title}</h4>
//       </div>
//       {children}
//     </div>
//   );
// };
