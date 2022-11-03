import axios from "axios";
/**
 * @param json is a JSON object
 * @returns a string value of the IPFS hash/CID.
 */
export const pinMetadataToIPFS = async (jsonData) => {
  const url = `${process.env.REACT_APP_PINATA_PIN_URL}/pinning/pinJSONToIPFS`;

  try {
    const res = await axios.post(url, jsonData, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`
      }
    });
    return res.data.IpfsHash;
  } catch (e) {
    console.log(e);
  }
};
