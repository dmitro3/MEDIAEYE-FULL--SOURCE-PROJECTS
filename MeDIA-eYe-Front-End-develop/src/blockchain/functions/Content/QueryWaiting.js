export const queryWaiting = async (Moralis, userAddress) => {
  const ApproveFile = Moralis.Object.extend('ApproveFile');
  const query = new Moralis.Query(ApproveFile);
  query.equalTo('userAddress', userAddress);
  query.lessThan('approval', 2);
  const result = await query.find();
  return result;
};
