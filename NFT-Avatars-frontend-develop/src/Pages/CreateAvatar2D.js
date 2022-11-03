import React, {  useEffect, useState } from "react";
import Footer from "../Components/Avatar/Avatar2D/footer";
import OptionsColor from "../Components/Avatar/Avatar2D/optionsColor";
import Tattoos from "../Components/Avatar/Avatar2D/layout/tattoos";
import SkinColor from "../Components/Avatar/Avatar2D/layout/SkinColor";
import Mounths from "../Components/Avatar/Avatar2D/layout/mouths";
import Hair from "../Components/Avatar/Avatar2D/layout/hair";
import Glasses from "../Components/Avatar/Avatar2D/layout/glasses";
import Facialhair from "../Components/Avatar/Avatar2D/layout/facialhair";
import Eyes from "../Components/Avatar/Avatar2D/layout/eyes";
import Eyebrows from "../Components/Avatar/Avatar2D/layout/eyebrows";
import Clothes from "../Components/Avatar/Avatar2D/layout/clothes";
import Accesories from "../Components/Avatar/Avatar2D/layout/accesories";
import FreePaidBtn from "../Components/Avatar/Avatar2D/freePaidBtn";
import { Canvg } from "canvg";
import { avatarService, uploadService } from "../services/api.service";
import { session } from "../utils/session.util";
import { useNavigate, useSearchParams } from "react-router-dom";

const Avatarone = (props) => {
  const [picker, setpicker] = useState("");
  const [Clothespicker, setClothespicker] = useState("");
  const [Eyebrowspicker, setEyebrowspicker] = useState("");
  const [Eyespicker, setEyespicker] = useState("");
  const [Facialhairpicker, setFacialhairpicker] = useState("");
  const [Glassespicker, setGlassespicker] = useState("");
  const [Hairpicker, setHairpicker] = useState("");
  const [Mounthspicker, setMounthspicker] = useState("");
  const [SkinColorpicker, setSkinColorpicker] = useState("");
  const [Tattoospicker, setTattoospicker] = useState("");

  const [callfunction, setcallfunction] = useState(false);

  const [editProfile, setEditProfile] = useState();

  const navigate = useNavigate();

  const resetAvatar = () => {
    setpicker("#c_none");
    setClothespicker("#c_none");
    setEyebrowspicker("#eb_none");
    setEyespicker("#e_none");
    setFacialhairpicker("#f_none");
    setGlassespicker("#g_none");
    setHairpicker("#h_none");
    setMounthspicker("#m_none");
    setSkinColorpicker("#skin_white");
    setTattoospicker("#t_none");
    setcallfunction(true);
  };
  const randomAvatar = () => {
    setpicker("");
    setClothespicker("");
    setEyebrowspicker("");
    setEyespicker("");
    setFacialhairpicker("");
    setGlassespicker("");
    setHairpicker("");
    setMounthspicker("");
    setSkinColorpicker("");
    setTattoospicker("");
    setcallfunction(true);
  };

  const [ searchParams ] = useSearchParams();

  useEffect(() => {
    randomAvatar();
    const param = searchParams.get('profile');
    setEditProfile(param);
  }, []);


  const [selectData] = useState("2D");

  const createAvatar = async () => {
    let traits = {};
    let combinedSvg =
      '<div id="avatar" style="position:relative;width:100%;height:100%;"><svg width="360px" height="360px" viewBox="0 0 360 360" style="position: absolute;width: 100%;height: 100%;">';
      const addIfAvailable = (element, trait) => {
        if (element !== undefined && element !== null) {
          traits[trait] = element.id;
          combinedSvg = combinedSvg + element.outerHTML;
        }
      };  
      const avatarDiv = document.querySelector("#avatar");
      addIfAvailable(
        avatarDiv.querySelector("#skinColor").querySelector(".show"), 'skin color'
      );
      addIfAvailable(avatarDiv.querySelector("#tattoos").querySelector(".show"), 'tattoos');
      addIfAvailable(
        avatarDiv.querySelector("#accesories").querySelector(".show"), 'accessories'
      );
      addIfAvailable(avatarDiv.querySelector("#clothes").querySelector(".show"), 'clothes');
      addIfAvailable(avatarDiv.querySelector("#eyebrows").querySelector(".show"), 'eyebrow');
      addIfAvailable(avatarDiv.querySelector("#eyes").querySelector(".show"), 'eyes');
      addIfAvailable(avatarDiv.querySelector("#mouths").querySelector(".show"), 'mouth');
      addIfAvailable(avatarDiv.querySelector("#hair").querySelector(".show"), 'hair');
      addIfAvailable(
        avatarDiv.querySelector("#facialhair2").querySelector(".show"), 'facialhair'
      );
      addIfAvailable(avatarDiv.querySelector("#glasses").querySelector(".show"), 'glasses');
  
      combinedSvg = combinedSvg + "</svg></div>";
  
      // Create an invisible canvas and render the combined SVG onto the canvas.
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");
      const drawn = Canvg.fromString(ctx, combinedSvg);
      drawn.render();
      const image = canvas.toDataURL("image/png");
      const res = await uploadService.uploadData(JSON.stringify(image));
      const user = session.get('eye-user');
      await avatarService.create({...res, userId: user.id, traits: traits, editProfile: editProfile === 'edit'});
      if(editProfile === 'edit') {
        navigate('/profile');
      } else {
        navigate('/my-profile?tab=0');
      }
  }
  
  const [freePaid, setFreePaid] = useState("free");

  const handleClick = (type) => {
    setFreePaid(type);
  };


  return (
    <React.Fragment>
      <div className="mediaProfilepage-wrap">
        <div className="mediaeyeAvatar-layout-middle">
          <div className="mediaeyeAvatar-layout-container">
            <div className="mediaeyeAvatar-createfirst">
              <div className="mediaeyeAvatar-createfirst-header">
                <h1>Create METAVATAR</h1>
              </div>
              <div className="mediaeyeAvatar-createfirst-content">
                <div id="avatar">
                  <FreePaidBtn  handleClick={handleClick}/>
                  <OptionsColor />
                  <Accesories
                    picker={picker}
                    callfunction={callfunction}
                    setcallfunction={setcallfunction}
                  />
                  <Clothes
                    Clothespicker={Clothespicker}
                    callfunction={callfunction}
                    setcallfunction={setcallfunction}
                  />
                  <Eyebrows
                    Eyebrowspicker={Eyebrowspicker}
                    callfunction={callfunction}
                    setcallfunction={setcallfunction}
                  />
                  <Eyes
                    Eyespicker={Eyespicker}
                    callfunction={callfunction}
                    setcallfunction={setcallfunction}
                  />
                  <Facialhair
                    Facialhairpicker={Facialhairpicker}
                    callfunction={callfunction}
                    setcallfunction={setcallfunction}
                  />
                  <Glasses
                    Glassespicker={Glassespicker}
                    callfunction={callfunction}
                    setcallfunction={setcallfunction}
                  />
                  <Hair
                    Hairpicker={Hairpicker}
                    callfunction={callfunction}
                    setcallfunction={setcallfunction}
                  />
                  <Mounths
                    Mounthspicker={Mounthspicker}
                    callfunction={callfunction}
                    setcallfunction={setcallfunction}
                  />
                  <SkinColor
                    SkinColorpicker={SkinColorpicker}
                    callfunction={callfunction}
                    setcallfunction={setcallfunction}
                  />
                  <Tattoos
                    Tattoospicker={Tattoospicker}
                    callfunction={callfunction}
                    setcallfunction={setcallfunction}
                  />
                </div>
                <Footer randomAvatar={randomAvatar} resetAvatar={resetAvatar} freePaid={freePaid} />
              </div>
              <div className="mediaeyeAvatar-createfirst-enteravatar">
                <button className={selectData === "2D" ? "enterbtn" : "enterbtn" } onClick={createAvatar}>Create Avatar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Avatarone;
