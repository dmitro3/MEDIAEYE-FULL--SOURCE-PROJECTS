export const queryFileType = async (url) => {
  const file = await fetch(url);
  const blob = await file.blob();
  return blob.type;
};
