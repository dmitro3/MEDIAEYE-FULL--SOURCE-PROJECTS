export const queryDenied = async (Moralis, userAddress) => {
  const ApproveFile = Moralis.Object.extend('ApproveFile');
  const query = new Moralis.Query(ApproveFile);
  query.equalTo('userAddress', userAddress);
  query.equalTo('approval', 2);
  const result = await query.find();
  return result;
};
