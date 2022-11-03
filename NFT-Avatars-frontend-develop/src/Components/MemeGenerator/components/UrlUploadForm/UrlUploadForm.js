import React, { useState } from "react";
import axios from "axios";
import styles from "./UrlUploadForm.module.css";

const UrlUploadForm = (props) => {
  const [inputUrl, setInPutUrl] = useState("");

  const handleOnChangeUrlInput = (e) => {
    setInPutUrl(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://api.mediaeyenft.com/metavatarapi/user/meta/vatar/imageupload",
        { url: inputUrl },
        { headers: { "Content-Type": "application/json" } }
      );

      const paramArr = res.data.data;

      // console.log('url;', paramArr.filePath );
      props.updateImageSrc(paramArr.filePath);
      props.openMain();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.LoginContainer}>
      <form onSubmit={onSubmit} className={styles.LoginForm}>
        Paste an URL
        <input
          value={inputUrl}
          type="text"
          onChange={handleOnChangeUrlInput}
          placeholder="Paste your URL here"
        />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default UrlUploadForm;
