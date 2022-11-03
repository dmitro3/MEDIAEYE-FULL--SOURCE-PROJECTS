import axios from "axios";
import { baseUrl } from "./index";

export const upload = async (file, folder, code, slip = 333) => {
    console.log(file, folder, code, slip);
    const formData = new FormData();
    formData.append("avatar", file);
    console.log(formData);
    const url = `https://api.ephotopick.com/v2/fileupload.php?code=${code}&folder=${folder}&slip=${slip}`;
    return await axios.post(encodeURI(url), formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const newAlbum = async (data) => {
    console.log(data);
    const url = `${baseUrl}/createalbum.php`;
    return await axios.post(encodeURI(url), JSON.stringify(data));
};

export const getAlbums = async (slip_id, user_id) => {
    console.log(slip_id, user_id);
    const url = `${baseUrl}/getalbums.php`;
    return await axios.post(encodeURI(url), JSON.stringify({ slip_id, user_id }));
};

export const getFiles = async (slip, code) => {
    const url = `${baseUrl}/getFiles.php?slip=${slip}&code=${code}`;
    console.log(slip, code, url);

    return await axios.get(encodeURI(url));
};

export const extendAlbumValidity = async (days, code) => {
    const url = `${baseUrl}/extendDays.php`;
    console.log(url);
    return await axios.post(encodeURI(url), JSON.stringify({ days, code }));
};
