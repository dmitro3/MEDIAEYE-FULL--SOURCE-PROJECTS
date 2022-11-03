import axios from 'axios';
export const CheckUrlExist = async (path) => {
  try {
    const req = await axios.get(path);
    if (req.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
