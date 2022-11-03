import React, {  useState } from "react";
import SaveImage from "./save_image";
import Options from "./options";
import Arrow from "../../../assets/images/UpArrow.png"
// import DownArrow from "../../../Components/icons/DownArrow";
// import SelectSearch from "react-select-search";
// import Select from 'react-select'
import Ellipse from "../../../assets/images/Ellipse.png"
// import { bgcolor, padding } from "@mui/system";
const Footer = (props) => {
  const [callresetMenu, setCallresetMenu] = useState(true);

  const randomAvatar = () => {
    setCallresetMenu(true);
    props.randomAvatar();
  };

  const clearAvatar = () => {
    setCallresetMenu(true);
    props.resetAvatar();
  };

  const [isOpenDropdown, setOpenDropdown] = useState(false);

  // const toggleHeaderDropdown = () => setOpenDropdown(!isOpenDropdown);

  // const [selectData, setSeletData] = useState("All");
  // const searchData = (type) => {
  //   setSeletData(type);
  // }

  const Data = [
    { value: 'chocolate', label: 'Babaava', image: Ellipse },
    { value: 'Adarak', label: 'Robotic Avatar', image: Ellipse },
    { value: 'Elachi', label: 'Cute Girl Avatar', image: Ellipse },
    { value: 'Candy', label: 'Peppa Avatar', image: Ellipse },
    { value: 'Toffy', label: 'Babaava', image: Ellipse },
  ]
  return (
    <div id="footer">
      <div className="settings">
        <img
          className="random"
          onClick={() => randomAvatar()}
          src={
            require("../../../assets/images/Avatar2d/img/random.svg").default
          } alt=""
        />
        <img
          className="random"
          onClick={() => clearAvatar()}
          src={require("../../../assets/images/Avatar2d/img/clear.svg").default} alt=""
        />

        <SaveImage />
      </div>
      <Options className="ADJGC"
        callresetMenu={callresetMenu}
        setCallresetMenu={setCallresetMenu}
        freePaid={props.freePaid}
      />
      <div className="asset-btn-tab">
        <div className="asset-dropdown">
          <span className="asset-dropdown-title" onClick={() => setOpenDropdown(!isOpenDropdown)}><p className="assets-title-name">My Assets</p><img className={isOpenDropdown?"asset-arrow-active":"asset-arrow"} src={Arrow} alt=""/></span>

          <ul className={isOpenDropdown ? "asset-dropdown-menu" : "dropdown-close"}>
            <div className="asset-dropdown-menu-lists">
              {
                Data.map((item) => {
                  return (
                    <div className="asset-dropdown-menu-name">
                      <div className="assets-menu">
                        <label className="assets-checkbox"  >
                          <img className="assets-img" src={item.image} alt="" />
                          {item.label}
                          <input type="checkbox" id="input" />
                          <span className="checkmark" htmlFor="input"></span>
                        </label>
                      </div>
                    </div>
                  )
                })
              }
            </div>

          </ul>
        </div>
      </div>
      <button className="library-btn">Library</button>
    </div>
  );
};
export default Footer;
