import Swal from 'sweetalert2';

export const uploadApproveFile = async (
  Moralis,
  category,
  description,
  file,
  link,
  name,
  type,
  userAddress
) => {
  // enable web3 before executing functions
  await Moralis.enableWeb3();
  if (
    !(
      file?.type === 'image/png' ||
      file?.type === 'image/jpeg' ||
      file?.type === 'image/jpg' ||
      file?.type === 'image/gif' ||
      file?.type === 'image/svg+xml' ||
      file?.type === 'video/mp4'
    )
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Must be of type .png, .jpg, .jpeg, .gif, .svg, .mp4',
      customClass: {
        popup:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup'
            : 'swal_popup',
        title:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup_title'
            : 'swal_popup_title',
        htmlContainer:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup_text'
            : 'swal_popup_text',
        confirmButton: 'swal_popup_button'
      }
    });
    return false;
  }
  // if file size is larger than 64mb or 64000000 bytes return error
  if (file.size > 64000000) {
    //alert('File must be smaller than 64mb');
    //return false;
  }

  try {
    const approveFile = new Moralis.File(file.name, file);
    const fileRes = await approveFile.saveIPFS();
    const approveObject = new Moralis.Object('ApproveFile');
    approveObject.set('approval', 3);
    approveObject.set('category', category);
    approveObject.set('description', description);
    approveObject.set('ipfs', `https://ipfs.io/ipfs/${fileRes.hash()}`);
    approveObject.set('link', link);
    approveObject.set('name', name);
    approveObject.set('type', type);
    approveObject.set('userAddress', userAddress);
    approveObject.set('fileType', file?.type);
    await approveObject.save();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
