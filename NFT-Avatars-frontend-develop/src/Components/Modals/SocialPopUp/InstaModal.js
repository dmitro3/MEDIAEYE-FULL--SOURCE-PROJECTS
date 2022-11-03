  import React,{ useEffect, useState } from "react";
import Cross from "../../icons/CrossIcon";
import "./socialStyle.scss";
// import RightSuccessful from "../../icons/RightSuccessful";

const InstaModal = (props) => {
  const { toggleinstaModal, instaModal1, userSocial, handleSocial } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    let temp = [...userSocial];
    const index = temp.findIndex(item => item.name.toLowerCase() === 'instagram');
    if(index === -1) return;
    setUsername(temp[index].username);
    setPassword(!temp[index].password ? '' : !temp[index].password);
  }, [instaModal1]);


  const handleInstagram = (event) => {
    event.preventDefault();
    let temp = [...userSocial];
    const index = temp.findIndex(item => item.name.toLowerCase() === 'instagram');
    temp[index].username = username;
    temp[index].password = password;
    handleSocial(temp);
    toggleinstaModal();
  }

  return (
    <>
      {instaModal1 ? (
        <div className="choose-file-modal">
          <div className="choose-file-modal-ct">
            <button
              className="choose-file-modal-close"
              onClick={() => {
                toggleinstaModal();
              }}
            >
              {" "}
              <Cross />{" "}
            </button>
            <div className="content">
              <h2 className="choose-file-modal-ct-heading">
                Enter Your Instagram Username and Password
              </h2>
              <form onSubmit={handleInstagram} className="form">
                <input
                  type="text"
                  placeholder="Phone number, username, or email"
                  name="username"
                  value={username}
                  onChange={e=>setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  required
                />
                <span className="button-box">
                  <button className="btn" type="submit" name="submit">
                    Submit
                  </button>
                </span>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default InstaModal;
