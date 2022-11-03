import axios from 'axios';
const FormData = require('form-data');

/**
 *
 * @param file is a file of required format (image/video mimetypes)
 * @returns a string value of the IPFS hash/CID.
 */
export const pinImageToIPFS = async (file) => {
  const url = `${process.env.REACT_APP_PINATA_PIN_URL}/pinning/pinFileToIPFS`;

  //we gather a local file for this example, but any valid readStream source will work here.
  let data = new FormData();
  data.append('file', file);

  // test pinata metadata
  const metadata = JSON.stringify({
    name: 'testname',
    keyvalues: {
      exampleKey: 'exampleValue'
    }
  });
  data.append('pinataMetadata', metadata);

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0
  });
  data.append('pinataOptions', pinataOptions);
  const res = await axios.post(url, data, {
    maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
    headers: {
      'Content-Type': `${file.type}`,
      Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`
    }
  });
  return res.data.IpfsHash;
};
